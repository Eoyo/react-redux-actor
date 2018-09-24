export type mergeObj<T> = { [P in keyof T]?: mergeObj<T[P]> };

// @ts-ignore;
export function Merge<T>(srcObj: T, obj: mergeObj<T>):T{
  let newObj:any = obj;
  
  if (srcObj === newObj) {
    return srcObj;
  }
  if (Array.isArray(obj) && Array.isArray(srcObj)) {
    // @ts-ignore;
    return obj;
  } else if (typeof obj === "object" && typeof srcObj === "object") {
    // @ts-ignore; srcObj 肯定是object{}; 更新一层object 包装
    srcObj = { ...srcObj };
    for (const x in obj) {
      srcObj[x] = Merge(srcObj[x], obj[x] as any);
    }
    return srcObj;
  } else {
    // @ts-ignore
    return obj ;
  }
}