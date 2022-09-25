const typeofFn = (anyValue: never) => typeof anyValue;
type TypeOfReturn = ReturnType<typeof typeofFn>;

export type PrimitiveDefinition = Exclude<
  TypeOfReturn,
  "object" | "undefined" | "function"
>;

export type PrimitiveDefinitionToType<T extends PrimitiveDefinition> =
  T extends "string"
    ? string
    : T extends "number"
    ? number
    : T extends "bigint"
    ? bigint
    : T extends "symbol"
    ? symbol
    : never;
