import {
  toArrMap,
  ArrayMap,
  toFuncMap,
  toAsyncFuncMap,
} from '../neuron-utills/obj/objMap';

type EvenNode = {[x: string]: Function};
export class OnEvent<T extends EvenNode, Async extends EvenNode = {}> {
  on: T;
  onAsync: Async;
  private onPool: ArrayMap<T>;
  private onAsyncPool: ArrayMap<Async>;
  constructor(obj: T, asycnObj?: Async) {
    this.onPool = toArrMap(obj);
    this.on = toFuncMap(this.onPool);
    if (asycnObj) {
      this.onAsyncPool = toArrMap(asycnObj);
      this.onAsync = toAsyncFuncMap(toFuncMap(this.onAsyncPool));
    }
  }
  addEventListener(obj: Partial<T>) {
    return toArrMap(obj, this.onPool);
  }
}
