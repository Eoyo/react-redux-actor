import {
  toArrMap,
  ArrayMap,
  toThroughMap,
  toLastAsyncMap,
  diffArrFilter,
} from '../neuron-utills/obj/objMap';

export type EvenNode = {[x: string]: Function};
export class OnEvent<T extends EvenNode, Async extends EvenNode = {}> {
  on: T;
  onAsync: Async;
  private onPool: ArrayMap<T>;
  private onAsyncPool: ArrayMap<Async>;
  constructor(obj: T, asycnObj?: Async) {
    this.onPool = toArrMap(obj);
    this.on = {} as any;
    // this.on 引用依赖this.onPool;
    for (const x in this.onPool) {
      this.on[x] = (...args: any[]) => {
        this.onPool[x].forEach(oneFunc => {
          oneFunc(...args);
        });
      };
    }

    // 构建异步的， 可推迟事件
    if (asycnObj) {
      this.onAsyncPool = toArrMap(asycnObj);
      this.onAsync = toLastAsyncMap(toThroughMap(this.onAsyncPool));
    }
  }
  addEventListener(obj: Partial<T>) {
    return toArrMap(obj, this.onPool);
  }
  removeEventListener(obj: Partial<T>) {
    // 修改引用以快速取消注册。
    diffArrFilter(this.onPool, obj);
  }
}
