type AF = (...args: any) => any;
type GetLastItem<T extends any[]> = T extends [
  ...any,
  infer C extends T[number]
]
  ? C
  : never;
type PipeFunctions<R extends ((...args: any) => any)[]> = (
  ...args: R[0] extends (...args: any) => any ? Parameters<R[0]> : any
) => GetLastItem<R> extends never ? any : ReturnType<GetLastItem<R>>;
type ArrayLength<T extends any[]> = T extends { length: infer C } ? C : never;

export function pipeline(): never;
export function pipeline<A, B>(fn1: (input: A) => B): (input: A) => B;
export function pipeline<A, B, C>(
  fn1: (input: A) => B,
  fn2: (input: B) => C
): (input: A) => C;
export function pipeline<A, B, C, D>(
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D
): (input: A) => D;
export function pipeline<A, B, C, D, E>(
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E
): (input: A) => E;
export function pipeline<T extends AF[]>(
  ...funcs: ArrayLength<T> extends 1 | 2 | 3 | 4 ? [] : T
): PipeFunctions<T>;

export function pipeline(...funcs: any[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any[]) =>
        b(a(...args))
  );
}
