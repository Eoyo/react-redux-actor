import {mergeObj, Merge} from '../obj-merge/merge';
import {OnEvent} from './onEvent';
type Key = string | number | symbol;
type AllReadonly<S> = {readonly [x in keyof S]: AllReadonly<S[x]>};

// 归约函数的类型
export type CeilReducerRus<S> = void | Promise<void>;
export type CeilReducer<S> = {
  [x: string]: (
    s: AllReadonly<S>,
    a: any,
    yet: (s: mergeObj<S>) => void,
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
export class Ceil<S, T extends CeilReducer<S>> {
  state: S;
  reducers: T;
  reducersStack: Key[] = [];
  stackSize: number;
  ev: CeilEvent<S, T> = new OnEvent({
    // ceil 内部事件的回调
    merge: (mergeObj: mergeObj<S>, type: keyof T) => {
      this.state = Merge(this.state, mergeObj);
    },
    before: (state: S, key: keyof T) => {},
    after: (state: S, key: keyof T) => {},
  });
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
    const yet = (state: mergeObj<S>) => {
      this.ev.on.merge(state, key);
      this.ev.on.after(this.state, key);
    };
    return (arg: getAction<T[x]>) => {
      this.checkStack();
      // 递归的阻断
      if (this.reducersStack.indexOf(key) >= 0) {
        console.warn(`在${key}处发生了递归阻断`);
        return;
      }

      this.reducersStack.push(key);
      // 将其作为ts只读的数据传给reducer
      this.ev.on.before(this.state, key);
      reducer(this.state as any, arg, yet);
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
