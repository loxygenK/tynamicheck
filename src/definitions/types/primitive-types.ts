const typeofFn = (anyValue: never) => typeof anyValue;
type TypeOfReturn = ReturnType<typeof typeofFn>;

export type PrimitiveTypeUnion = Exclude<
  TypeOfReturn,
  "object" | "undefined" | "function"
>;

export type PrimitiveTypeUnionToActualType<T extends PrimitiveTypeUnion> =
  T extends "string"
    ? string
    : T extends "number"
    ? number
    : T extends "bigint"
    ? bigint
    : T extends "symbol"
    ? symbol
    : never;
