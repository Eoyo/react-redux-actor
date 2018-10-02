import {Neuron} from './neuron';

function setTime(time: number) {
  return new Promise((res: (data: number) => void) => {
    setTimeout(() => {
      res(time);
    }, time);
  });
}

class Game {
  gameStart = false;
  gameEnd = false;
  clickTime: number = 0;
  sign: ['click5'];
}
export const S = Neuron(new Game())({
  async playGame(s, a, yet) {
    if (yet.count > 1) return;

    yet({
      gameStart: true,
    });

    const winner = await yet.race([1000, ['click5']]);

    console.log('winner', winner);
    yet({
      gameEnd: true,
    });
  },
  click(s, a, yet) {
    // 可以立刻拿到归约状态
    s = yet({
      clickTime: s.clickTime + 1,
    });

    if (s.clickTime >= 5) {
      // 触发状态树sign事件
      yet({
        sign: ['click5'],
      });
    }
  },
  async autoClick(s, a, yet) {
    const atClick5 = yet.break(yet.sign(['click5']));
    while (true) {
      await yet.time(80);
      atClick5();
      S.click({});
    }
  },
});
