/**
 * @@typesafe, 为函数添加额外的属性
 */
export function UpgradeFunction<T>(func: T) {
  return function<More>(inserter: More): T & More {
    return Object.assign(func, inserter);
  };
}

/**
 * 让同类型的函数数组变成一个函数
 */
export function Through<T extends Function>(funcs: T[]): T {
  const rus: any = (...args) => {
    for (const f of funcs) {
      f(...args);
    }
  };
  return rus;
}
