import {
  CeilReducer,
  getAction,
  Ceil,
  CeilEvent,
  CeilEventObjMap,
} from '../redux-ceil/ceil';
import {UpgradeFunction} from '../neuron-utills/functional/function';
export type NeuronRus<R> = {[x in keyof R]: (arg: getAction<R[x]>) => void};

type CeilWatcher = (ev: CeilEvent<any, any>) => (() => void);

// Neuron 代理Ceil中的OnEvent。
let CeilWatcher: CeilWatcher | null = null;
let WatcherRemover: null | (() => void) = null;

function NeuronConsturctor<S>(state: S) {
  return function reducers<
    R extends CeilReducer<S> & Partial<Record<'getCeil', never>>
  >(reducers: R) {
    const ceil = new Ceil(state, reducers);

    // 控制是否监听ceil
    if (CeilWatcher) {
      WatcherRemover = CeilWatcher(ceil.ev);
    }

    // 构造Neuron的Action函数
    const rus: NeuronRus<R> = {} as any;
    for (const x in reducers) {
      rus[x] = ceil.simulate(x);
    }

    // 构造neuron 保留的方法。
    return UpgradeFunction(rus)({
      getCeil() {
        return ceil;
      },
    });
  };
}

export const Neuron = UpgradeFunction(NeuronConsturctor)({
  addWatcher(obj: Partial<CeilEventObjMap<any, any>>) {
    if (WatcherRemover) {
      WatcherRemover();
    }
    CeilWatcher = ev => {
      return ev.addEventListener(obj);
    };
  },
});
