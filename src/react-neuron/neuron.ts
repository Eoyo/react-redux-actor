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
let CeilWatcher: CeilWatcher | null = null;
let WatcherRemover: null | (() => void) = null;

function NeuronConsturctor<S>(state: S) {
  return function reducers<R extends CeilReducer<S>>(
    reducers: R,
  ): NeuronRus<R> {
    const ceil = new Ceil(state, reducers);
    if (CeilWatcher) {
      WatcherRemover = CeilWatcher(ceil.ev);
    }
    // 构造Neuron的Action函数
    const rus: NeuronRus<R> = {} as any;
    for (const x in reducers) {
      rus[x] = ceil.simulate(x);
    }
    return rus;
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
