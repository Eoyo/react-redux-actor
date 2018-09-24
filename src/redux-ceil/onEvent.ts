import {toArrMap, ArrayMap, toFuncMap} from '../neuron-utills/obj/objMap';

export class OnEvent<T extends {[x: string]: Function}> {
  on: T;
  private onPool: ArrayMap<T>;
  constructor(obj: T) {
    this.onPool = toArrMap(obj);
    this.on = toFuncMap(this.onPool);
  }
  addEventListener(obj: Partial<T>) {
    return toArrMap(obj, this.onPool);
  }
}
