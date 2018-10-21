import {
  CeilReducers,
  Ceil,
  CeilEventObjMap,
  OneCeilReducer,
  CeilYet,
  AllReadonly,
  CeilReducerRus,
} from '../redux-ceil/ceil';
import {UpgradeFunction} from '../neuron-utills/functional/function';
import {PropsProxy} from '../neuron-utills/functional/PropProxy';
import {OnEvent} from '../redux-ceil/onEvent';
// Neuron 代理Ceil中的OnEvent。
// const CeilWatcher = PropsProxy((obj: Partial<CeilEventObjMap<any, any>>) => {
//   return (ev: OnEvent<any>) => {
//     return ev.addEventListener(obj);
//   };
// });

// 构造神经元的工厂函数
// function NeuronConsturctor<S>(state: S) {
//   return function reducers<
//     R extends CeilReducer<S> & Partial<Record<'getCeil', never>>
//   >(reducers: R) {
//     const ceil = new Ceil(state, reducers);

//     CeilWatcher.execute(ceil.ev);

//     // 构造Neuron的Action函数
//     const rus: NeuronRus<R> = {} as any;
//     for (const x in reducers) {
//       rus[x] = ceil.simulate(x);
//     }

//     // 构造neuron 保留的方法。
//     return UpgradeFunction(rus)({
//       _getCeil() {
//         return ceil;
//       },

//       // 模拟redux 的store;
//       _getStore() {
//         return ceil.getStore();
//       },
//     });
//   };
// }

// export const Neuron = UpgradeFunction(NeuronConsturctor)({
//   _addWatcher: CeilWatcher.prepare,
// });

// Neuron._addWatcher({
//   merge(s, t) {
//     console.log('merge', t, s);
//   },
// });

// 表示任意一个使用class 定义的函数.
export interface AnyClass {
  new (...args: any[]): any;
}

// 使用Action和State定义reducers
export type MapActionToReducer<State, Act, OriAction = {}> = {
  [x in keyof Act]: (
    s: AllReadonly<State>,
    a: Act[x],
    yet: CeilYet<State, Act & OriAction>,
  ) => CeilReducerRus<State>
};

/**
 * Neuron 的实例形态
 */

// 使用reducers转化实例状态, 示例状态就是状态类的示例对象
export type ReduceInstanceState<State extends object, OriActions = {}> = <
  ReducersAction
>(
  reducers: MapActionToReducer<State, ReducersAction, OriActions>,
) => ExecuteActions<ReducersAction & OriActions>;

// 和reducers对应的触发函数
export type ExecuteActions<Actions> = {
  [x in keyof Actions]-?: JudgeAction<Actions[x]>
};

// 可选性没法映射出来.
// 相等性没法判断出来
// 使用null表现出可选的参数.
export type JudgeAction<Act> = Act extends undefined | null
  ? (arg?: Act) => void
  : (arg: Act) => void;

/**
 * Extends 的调试
 */

// type ExtendTest<OneType, Condition> = OneType extends Condition
//   ? 'true'
//   : 'false';

// type t1 = ExtendTest<never, string>; //  t1 = never
// type t3 = ExtendTest<any, undefined>; // t3 = 'true' | 'false'
// type t4 = ExtendTest<object, unknown>; // t3 = 'true'
// type t5 = ExtendTest<undefined | number, undefined | unknown>; // t3 = 'false'

// type t01 = ExtendTest<undefined | object, object>; // 'true'
// type t02 = ExtendTest<undefined | object, undefined>; // 'false'

// type t11 = Exclude<undefined | object, object>; // 'never'
// type t12 = Exclude<undefined | object, undefined>; // 'object'

// type t21 = Exclude<null | object, object>; // 'null'
// type t22 = Exclude<null | object, null>; // 'null'

/**
 * Neuron 的高阶形态
 */
// 使用reducers转化高阶状态, 高阶状态就是状态类本身
export type ReduceAdvanceState<AdvanceState extends object, OriActions = {}> = <
  ReducersAction = {}
>(
  reducers: MapActionToReducer<AdvanceState, ReducersAction, OriActions>,
) => Neuron<AdvanceState, ReducersAction & OriActions>;

// 初始Neuron 的 OriState 为空对象.
export type Neuron<OriState extends object = {}, OriActions = {}> = <
  C extends AnyClass | object,
  S = C extends AnyClass ? InstanceType<C> : C
>(
  StateCreate: C,
) => C extends AnyClass
  ? ReduceAdvanceState<S & OriState, OriActions>
  : ReduceInstanceState<S & OriState, OriActions>;
