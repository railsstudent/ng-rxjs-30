import { reduce } from 'rxjs';

export function sum<T, A extends number>(
  sumFn: (acc: A, t: T) => A,
  initial: A
) {
  return reduce(sumFn, initial);
}
