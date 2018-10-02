import {
  CeilReducer,
  getAction,
  Ceil,
  CeilEventObjMap,
} from '../redux-ceil/ceil';
import {UpgradeFunction} from '../neuron-utills/functional/function';
import {PropsProxy} from '../neuron-utills/functional/PropProxy';
import {OnEvent} from '../redux-ceil/onEvent';
export type NeuronRus<R> = {[x in keyof R]: (arg: getAction<R[x]>) => void};

// Neuron 代理Ceil中的OnEvent。
const CeilWatcher = PropsProxy((obj: Partial<CeilEventObjMap<any, any>>) => {
  return (ev: OnEvent<any>) => {
    return ev.addEventListener(obj);
  };
});

// 构造神经元的工厂函数
function NeuronConsturctor<S>(state: S) {
  return function reducers<
    R extends CeilReducer<S> & Partial<Record<'getCeil', never>>
  >(reducers: R) {
    const ceil = new Ceil(state, reducers);

    CeilWatcher.execute(ceil.ev);

    // 构造Neuron的Action函数
    const rus: NeuronRus<R> = {} as any;
    for (const x in reducers) {
      rus[x] = ceil.simulate(x);
    }

    // 构造neuron 保留的方法。
    return UpgradeFunction(rus)({
      _getCeil() {
        return ceil;
      },
    });
  };
}

export const Neuron = UpgradeFunction(NeuronConsturctor)({
  _addWatcher: CeilWatcher.prepare,
});

Neuron._addWatcher({
  merge(s, t) {
    console.log('merge', t, s);
  },
});
