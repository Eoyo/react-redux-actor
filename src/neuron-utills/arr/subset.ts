/**
 * subset, 子集
 * A <= B ， 集合
 */

export function isSubsetOf(a: any[], b: any[]) {
  if (b.length < a.length) return false;
  for (const oneA of a) {
    if (b.indexOf(oneA) < 0) {
      return false;
    }
  }
  return true;
}
