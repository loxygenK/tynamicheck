/**
 * (internal) Execute {@link fn} over elements of {@link iter} until
 * {@link fn} returns something rather than `undefined`.
 */
export function findMap<T, R>(
  iter: Array<T>,
  fn: (elem: T, index: number) => R | undefined
): R | undefined {
  for (let i = 0; i < iter.length; i++) {
    const result = fn(iter[i], i);
    if (result !== undefined) {
      return result;
    }
  }

  return undefined;
}
