/**
 * Prepare函数和Execute函数。
 * 将参数映射成代执行的函数。
 */

export function PropsProxy<T, U extends any[], N extends any[]>(
  func: (...args: U) => (...need: N) => any,
) {
  let funcs: ((...need: N) => any)[] = [];
  return {
    execute(...args: N) {
      funcs.forEach(preparedFunc => {
        preparedFunc(...args);
      });
    },
    prepare(...args: U) {
      const preparedFunc = func(...args);
      funcs.push(preparedFunc);
      return preparedFunc;
    },
    remove(preparedFunc: (...need: N) => any) {
      funcs.filter(one => {
        return one !== preparedFunc;
      });
    },
  };
}
