export interface UniqIdFn<T> {
  (): T;
}

export function uniqIdFactoryString(prefix: string): UniqIdFn<string> {
  let id = 1;
  return () => `${prefix}-${id++}`;
}

export function uniqIdFactoryNumber(): UniqIdFn<number> {
  let id = 1;
  return () => id++;
}
