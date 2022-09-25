import { BuiltInDefinedType, BuiltinDefinitions } from "../builtin";

export type Definition<T extends Array<unknown> = [BuiltinDefinitions]> =
  T[number];

export type DefinedType<
  D,
  T extends Array<unknown> = [BuiltInDefinedType<D>]
> = T extends [infer Head, ...infer Tail]
  ? [Head] extends [never]
    ? DefinedType<D, Tail>
    : Head
  : never;
