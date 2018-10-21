import {Neuron} from './neuron';
import * as React from 'react';
// import {connect} from 'react-redux';

// function setTime(time: number) {
//   return new Promise((res: (data: number) => void) => {
//     setTimeout(() => {
//       res(time);
//     }, time);
//   });
// }

// class Game {
//   gameStart = false;
//   gameEnd = false;
//   clickTime: number = 0;
//   sign: ['click5'];
// }
// export const S = Neuron(new Game())({
//   async playGame(s, a, yet) {
//     // yet.count 记录了当前有几个自己被挂起来了;
//     if (yet.count > 1) return;

//     // 使用自己的闭包可以记录进入时的数量标记。
//     let count = yet.count;

//     yet({
//       gameStart: true,
//     });

//     // 时间和sign竞争, 内部使用了cancleHock， 竞争完后清除了异步监听。
//     const winner = await yet.race([1000, ['click5']]);
//     console.log('winner', winner);

//     yet({
//       gameEnd: true,
//     });
//   },

//   click(s, a, yet) {
//     // 可以立刻拿到归约状态
//     s = yet({
//       clickTime: s.clickTime + 1,
//     });

//     if (s.clickTime >= 5) {
//       // 触发状态树sign事件
//       yet({
//         sign: ['click5'],
//       });
//     }
//   },

//   async autoClick(s, a, yet) {
//     const breakAtClick5 = yet.break(yet.sign(['click5']));
//     while (true) {
//       await yet.time(1);
//       breakAtClick5();
//       S.click({});
//     }
//   },
// });

// 程序设计的阶段优先实现了类型,
const Neuron: Neuron = {} as any;

const PopCard = Neuron(
  class PopCard {
    visible = false;
    message = '';
  },
)<{
  close: null;
  open: null;
  setMessage: {
    message: string;
  };
}>({
  open(s, a, yet) {
    yet({
      visible: true,
    });
  },
  close(s, a, yet) {
    yet({
      visible: true,
    });
  },
  setMessage(s, a, yet) {
    yet({
      message: a.message,
    });
  },
});

// 进一步继承
const BigPopCard = PopCard(
  class BigPopCard {
    size = 0;
  },
)<{
  // 主动定义action的类型
  setBigger: {
    size: number;
  };
}>({
  setBigger(s, a, yet) {
    // 只能使用yet 触发归约
    s = yet.call({
      setMessage: {
        message: '',
      },
      close: null,
    });

    // yet 函数总是同步的执行
    s = yet({
      size: s.size + 10,
    });
  },
});

class OnePerson {
  name: string = '';
}

const popBox = BigPopCard({
  person: new OnePerson(),
})<{
  setName: {
    name: string;
  };
}>({
  setName(s, a, yet) {
    yet({
      person: {
        name: a.name,
      },
    });
  },
});

popBox.setName({
  name: 'liumiao',
});

// bigger 为响应式的函数.
// bigger()(s => {
//   console.log(s);
// });

// // 响应元需要配置, Neuron需要高阶的配置: 响应元, 状态存储器, 状态归约器.
// bigger(s => {
//   return s.visible;
// })(p => {
//   return <div>{p}</div>;
// });
