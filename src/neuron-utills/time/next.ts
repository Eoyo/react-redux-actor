/**
 * next tick, 推入下一个周期执行。
 */
export function nextTick(func: () => void, time?: number) {
  if (typeof time === 'number') {
    setTimeout(() => {
      func();
    }, time);
  } else {
    Promise.resolve().then(() => {
      func();
    });
  }
}
