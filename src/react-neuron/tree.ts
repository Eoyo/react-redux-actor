import {Neuron} from './neuron';

/**
 * 树状的组合形式
 */

const one = Neuron({
  one: 0,
})<{
  setOne: number;
}>({
  setOne(S, a, yet) {
    yet({
      one: a,
    });
  },
});

const two = Neuron({
  two: 0,
})<{
  setTwo: number;
}>({
  setTwo(S, a, yet) {
    yet({
      two: a,
    });
  },
});

const number = Neuron(
  new class Numbers {
    number1 = one;
    number2 = two;
  }(),
)<{
  add: number;
  multiple: number;
  multipleAdd: number;
}>({
  add(S, a, yet) {
    // yet可以拿到action函数
    yet({
      number1: {
        // S. 可以直接拿到数据
        setOne: S.number1.one + a,
      },
      number2: {
        setTwo: S.number2.two + a,
      },
    });
  },
  multiple(S, a, yet) {
    // 一次yet 中属性的操作看作是并发的, 也可以做到并发!
    // 集群yet;
    yet({
      number1: {
        setOne: S.number1.one * a,
      },
      nummber2: {
        setTwo: S.number2.two * a,
      },
    });
  },
  multipleAdd(S, a, yet) {
    // 单独call, add
    S = yet.call.add(a);

    // 集群call
    S = yet.call({
      multiple: a,
    });
  },
});
