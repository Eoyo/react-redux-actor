import { createStore, Action, applyMiddleware, Store } from "redux";
import { mergeObj, Merge, next, Senior, Various } from "./tool";
import logger from "redux-logger";
type SpecialActionType =
  | "redux-actor-merge"
  | "redux-actor-update"
  | "*[actions.type]"; // generator reducers

function specialActions(
  s: any,
  d: {
    type: SpecialActionType;
    mergeState: any;
    yetRus?: any;
  }
) {
  switch (d.type) {
    case "redux-actor-merge":
      // merge 的时候也做信道的处理;
      if (s.sign !== undefined && !d.mergeState.sign) {
        s.sign = [];
      }
      return Merge(s, d.mergeState);
    case "redux-actor-update":
      return Various(s)(ns => ns);
    default:
      if (d.type[0] === "*" && typeof d.yetRus === "object") {
        if (s.sign !== undefined && !d.yetRus.sign) {
          s.sign = [];
        }
        return Merge(s, d.yetRus);
      } else {
        return null;
      }
  }
}
function BuildBigReducer(
  reducers: any,
  actions: any,
  type: "always" | "normal"
) {
  const normal = (
    state: any,
    ac: { type: string },
    store: { dispatch: any }
  ) => {
    const isSpecialRus = specialActions(state, ac as any);

    // 特殊的内置action不使用reducers处理
    if (isSpecialRus) {
      return isSpecialRus;
    } else if (typeof reducers[ac.type] === "function") {
      const reducerRus = reducers[ac.type](
        state,
        Object.assign({}, actions[ac.type], ac)
      );

      let usertoMerge = reducerRus;
      if (
        // is generator
        typeof reducerRus[Symbol.iterator] === "function"
      ) {
        // next promise tick to generate;
        next(() => {
          Senior(reducerRus, (yetRus: any) => {
            if (typeof yetRus === "function") {
              return yetRus();
            } else if (!Array.isArray(yetRus) && typeof yetRus === "object") {
              return store.dispatch({
                type: `*[${ac.type}]`,
                yetRus: yetRus
              });
            } else {
              console.log(
                "Actor reducer wrong state return @" + `*[${ac.type}]`,
                yetRus
              );
              return;
            }
          });
        });

        // same state , notthing to do;
        usertoMerge = state;
      }

      // 原对象引用不处理
      if (usertoMerge === state) {
        return state;
      } else {
        // auto set sign;
        if (state.sign !== undefined && !reducerRus.sign) {
          state.sign = [];
        }
        // auto merge
        return Merge(state, usertoMerge);
      }
    } else {
      if (state.sign !== undefined) {
        state.sign = [];
      } // else {}
      return state;
    }
  };
  if (type === "always") {
    return (s: any, d: any, store: any) =>
      reducers.always(normal(s, d, store), d.type);
  } else {
    return normal;
  }
}

interface Unsubscribe {
  (): void;
}
type ActorReserve<S> = {
  merge(obj: mergeObj<S>): void;
  update(): void; //强制更新
  subscribe(follower: (obj: S) => void): Unsubscribe;
  grab: {
    <T>(graber: (obj: S) => T): T;
    (): S;
  };
};

type CustomRus<A> = { [x in keyof A]: (actionData: A[x]) => void };

type MergePipe<S> = {
  pipe<state>(
    actor: ActorReserve<state>,
    transform: (s: S) => mergeObj<state>
  ): void;
};
type GetStore<S> = {
  getStore(): Store<S>;
};
type ActorRus<S, A> = GetStore<S> &
  ActorReserve<S> &
  CustomRus<A> &
  MergePipe<S>;

type oneReducer<S, A, x extends keyof A> = (
  s: S,
  d: A[x] & { type: x }
) => mergeObj<S> | IterableIterator<mergeObj<S> | (() => void) | Promise<any>>;
type ActorReducer<S, A> = { [x in keyof A]: oneReducer<S, A, x> };

export function Actor<S>(state: S) {
  return function Actions<A extends object>(actions: A) {
    return function Reducers(
      reducers: ActorReducer<S, A> & {
        // t 为 ActionType, 用于提示当前的结果是哪个action造成的
        always?: (s: S, t?: keyof A) => S;
      }
    ) {
      // 建立 reducer , store
      const isAlways = reducers.always ? "always" : "normal";
      const bigReducer = BuildBigReducer(reducers, actions, isAlways);

      // 不直接开发成redux的中间件, 避免和redux 耦合过多, Actor 4.0 可能使用新的内核.
      const store: Store<S> = createStore<
        S,
        Action<keyof A | SpecialActionType>,
        {},
        {}
      >((s = state, d) => {
        return bigReducer(s, d as any, store);
        // @Middleware here!!
      }, applyMiddleware(logger));
      // });

      // Actor预留的函数
      const rus: ActorReserve<S> & GetStore<S> & MergePipe<S> = {
        getStore() {
          return store;
        },
        merge(obj: mergeObj<S>) {
          store.dispatch({
            type: "redux-actor-merge",
            mergeState: obj
          });
        },
        update() {
          store.dispatch({
            type: "redux-actor-update"
          });
        },
        grab(graber?: (obj: S) => any) {
          if (graber) {
            return graber(store.getState());
          } else {
            return store.getState();
          }
        },
        subscribe(follower: (obj: S) => void) {
          return store.subscribe(() => {
            next(() => {
              const state = store.getState();
              follower(state);
            });
          });
        },
        pipe(actor, func) {
          store.subscribe(() => {
            const mergeState = func(store.getState());
            actor.merge(mergeState);
          });
        }
      };

      // 构造用户的action函数到Actor上;
      Object.getOwnPropertyNames(actions).forEach(d => {
        // @ts-ignore; 注入
        rus[d] = (prop: any) => {
          store.dispatch({
            type: d,
            ...prop
          });
        };
      });

      // 作为真正的ActorRus返回
      return rus as ActorRus<S, A>;
    };
  };
}

// 动作分解, 主要是为了类型!
export function Act<S>() {
  return function Actions<A extends object>(actions: A) {
    return function Reducers(reducers: ActorReducer<S, A>) {
      return {
        reducers,
        actions
      };
    };
  };
}
