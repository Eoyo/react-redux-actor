import {mergeObj, Merge} from '../obj-merge/merge';
import {OnEvent} from './onEvent';
import {isSubsetOf} from '../neuron-utills/arr/subset';
export type Key = string | number | symbol;
export type AllReadonly<_S> = {readonly [x in keyof _S]: AllReadonly<_S[x]>};
export type getSign<S> = S extends {sign: infer Sign} ? Sign : string[];
export type getSignType<S> = S extends {sign: (infer Sign)[]} ? Sign : string;

// !!Eror
// 用于处理action cancle。 Cancle 阻断程序执行。
export class CancleError extends Error {
  constructor(...args) {
    super(...args);
    this.message = '__cancle_error__';
  }
}

// 归约函数的类型
export type CeilReducerRus<S> = void | Promise<void>;
export type CeilReducer<S> = {
  [x: string]: (
    s: AllReadonly<S>,
    a: any,
    yet: {
      (s: mergeObj<S>): S;
      running: boolean;

      // action 的运行计数
      count: number;

      // 使用当前的归约，之前的都干掉。
      killBefore: () => void;

      // 常用的时间函数。
      time: (time: number) => Promise<{}>;

      // 监听sign
      sign: (s: getSign<S>) => Promise<{}>;

      // 信号和时间的记录竞争，父区域不知道信号的发出者是哪个， 只关注是否有这个信号。
      // 时间和sign 的混合监听
      race: (racer: (number | getSign<S>)[]) => Promise<number | getSign<S>>;

      // 断点函数， 一旦断点被满足， 则断点函数运行发生中断错误。
      break: (p: Promise<any>) => (() => void);
    },
  ) => CeilReducerRus<S>;
};

// ceil 内部事件的回调
export type CeilEventObjMap<S, T> = {
  merge: (mergeObj: mergeObj<S>, type: keyof T) => void;
  before: (state: S, key: keyof T) => void;
  after: (state: S, key: keyof T) => void;
};
export type CeilEvent<S, T> = OnEvent<CeilEventObjMap<S, T>>;

// 推断出action的类型。
export type getAction<F> = F extends (s: any, a: infer R, yet: any) => any
  ? R
  : any;

// 构造细胞元
export class Ceil<
  S extends {
    sign?: string[];
  },
  T extends CeilReducer<S>
> {
  state: S;
  reducers: T;
  reducersStack: Key[] = [];
  stackSize: number;
  ev = new OnEvent(
    <CeilEventObjMap<S, T>>{
      // ceil 内部事件的回调
      merge: (mergeObj, key) => {
        this.state = Merge(this.state, mergeObj);
        if (mergeObj.sign === undefined) {
          this.state.sign = [];
        }
      },
      before: (state, key) => {},
      after: (state, key) => {},
    },
    {
      update: (state, key) => {},
    },
  );
  constructor(state: S, reducers: T, stackSize: number = 10) {
    this.reducers = reducers;
    this.state = state;
    this.stackSize = stackSize;
  }
  private checkStack() {
    if (this.reducersStack.length > this.stackSize) {
      throw new Error('simulate stack overflow');
    }
  }

  setStackSize(size: number) {
    this.stackSize = size;
    this.checkStack();
  }

  // 构造刺激函数
  simulate<x extends keyof T>(key: x) {
    const reducer = this.reducers[key];

    // 用于状态diff merge 的递质函数。每个action函数对应一类yet函数。
    const yet = Object.assign(
      (state: mergeObj<S>) => {
        this.ev.on.before(this.state, key);
        this.ev.on.merge(state, key);
        this.ev.on.after(this.state, key);
        this.ev.onAsync.update(this.state, key);
        // 立即返回当前更新的状态。
        return this.state;
      },
      {
        running: false,
        count: 0,
        killBefore: () => {},
        time: (time: number) => {
          return new Promise<number>(res => {
            setTimeout(() => {
              res(time);
            }, time);
          });
        },
        sign: (subSign: getSign<S>) => {
          // 回调mergeAfter后的sign事件
          return new Promise(
            (
              res: (result: getSign<S>) => any,
              rej: (message: string) => any,
            ) => {
              const afterSign = (state: S) => {
                if ('sign' in state) {
                  if (isSubsetOf(subSign, state.sign)) {
                    this.ev.removeEventListener({after: afterSign});
                    res(subSign);
                  }
                } else {
                  // state 上没有sign
                  this.ev.removeEventListener({after: afterSign});
                  rej('no sign on state!!');
                }
              };
              this.ev.addEventListener({
                after: afterSign,
              });
            },
          );
        },

        race: (racer: any[]) => {
          return Promise.race(
            racer.map(r => {
              if (typeof r === 'number') {
                return yet.time(r);
              } else {
                return yet.sign(r as any) as any;
              }
            }),
          );
        },

        break: (pro: Promise<any>) => {
          let isBreak = false;
          pro.then(() => {
            isBreak = true;
          });

          return () => {
            if (isBreak) {
              throw new CancleError('yet.break at:' + key);
            }
          };
        },
      },
    );

    // 返回action函数。
    return (arg: getAction<T[x]>) => {
      this.checkStack();

      // 递归的阻断, 避免状态平衡的递归阻塞。
      if (this.reducersStack.indexOf(key) >= 0) {
        console.warn(`在${key}处发生了递归阻断`);
        return;
      }
      // 记录归约的轨迹
      this.reducersStack.push(key);

      // yet in
      yet.running = true;
      yet.count += 1;

      try {
        const rus = reducer(this.state as any, arg, yet);
        // yet out
        if (rus instanceof Promise) {
          rus.then(
            () => {
              // yet out
              yet.count -= 1;
              if (yet.count <= 0) {
                yet.running = false;
                yet.count = 0;
              } else {
                yet.running = true;
              }
            },

            // 异步的捕获异步的错误。
            error => {
              if (
                error instanceof CancleError ||
                error.message === '__cancle_error__'
              ) {
                console.error('cancle the reducer : ' + key);
              } else {
                throw error;
              }
            },
          );
        } else {
          // yet out
          yet.count -= 1;
          if (yet.count <= 0) {
            yet.running = false;
            yet.count = 0;
          } else {
            yet.running = true;
          }
        }
      } catch (error) {
        if (
          error instanceof CancleError ||
          error.message === '__cancle_error__'
        ) {
          console.error('cancle the reducer : ' + key);
        } else {
          throw error;
        }
      }
      this.reducersStack.pop();
    };
  }
}

// const c = new Ceil({
//   good: ''
// }, {
//   getName(a: {
//     id: string
//   })  {
//     return {

//     };
//   }
// })
// const getName = c.simulate('getName')
