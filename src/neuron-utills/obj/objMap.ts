/**
 * objMap, 使用obj进行映射的数据结构
 */
import {Through, LastAsync} from '../functional/function';
import {nextTick} from '../time/next';

/**
 * javascript 的对象数据结构
 */

export type ArrayMap<T> = {[x in keyof T]: T[x][]};

function toArrMap2<T>(objMap: T, arrMap: ArrayMap<T>): () => void {
  let arrMapRus = arrMap;
  // 将objMap放入arrMap
  for (const x in objMap) {
    if (x in arrMapRus) {
      arrMapRus[x].push(objMap[x]);
    }
  }
  return () => {
    for (const x in objMap) {
      if (x in arrMapRus) {
        arrMapRus[x] = arrMapRus[x].filter(one => one !== objMap[x]);
      }
    }
  };
}
function toArrMap1<T>(objMap: T): ArrayMap<T> {
  const arrMapRus = {} as ArrayMap<T>;
  for (const x in objMap) {
    arrMapRus[x] = [];
    arrMapRus[x].push(objMap[x]);
  }
  return arrMapRus;
}

/**
 * toArrMap, 将 ObjMap 变成ArrMap;
 */
export function toArrMap<T>(objMap: T, arrMap: ArrayMap<T>): () => void;
export function toArrMap<T>(objMap: T): ArrayMap<T>;
export function toArrMap(objMap, arrMap?): any {
  if (arrMap) {
    return toArrMap2(objMap, arrMap);
  } else {
    return toArrMap1(objMap);
  }
}

/**
 * toFuncMap, 将ArrMap 变成FuncMap
 */
export type funcNode = {
  [x: string]: Function;
};

export function diffArrFilter<T extends funcNode>(
  obj: ArrayMap<T>,
  pobj: Partial<T>,
) {
  for (const x in pobj) {
    obj[x] &&
      (obj[x] = obj[x].filter(onep => {
        return onep !== pobj[x];
      }));
  }
}

// map function to async function;
export function toLastAsyncMap<T extends funcNode>(funcMap: T): T {
  const rus: T = {} as any;
  for (const x in funcMap) {
    rus[x] = LastAsync(funcMap[x]);
  }
  return rus;
}

// map function array to through function
export function toThroughMap<T extends funcNode>(arrMap: ArrayMap<T>): T {
  const rus: any = {};
  for (const x in arrMap) {
    rus[x] = Through(arrMap[x]);
  }
  return rus;
}
