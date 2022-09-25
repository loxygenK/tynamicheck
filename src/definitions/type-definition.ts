import { ArrayDefinition, ArrayDefinitionToType } from "./array";
import {
  PrimitiveTypeUnion,
  PrimitiveTypeUnionToActualType,
} from "./types/primitive-types";

export type Definition = PrimitiveTypeUnion | ObjectDefinition;
export type ObjectDefinition = { [key: string]: Definition };

export type DefinedType<T extends Definition> = T extends ArrayDefinition
  ? DefinedType<ArrayDefinitionToType<T>>
  : T extends ObjectDefinition
  ? ObjectDefinitionToType<T>
  : T extends PrimitiveTypeUnion
  ? PrimitiveTypeUnionToActualType<T>
  : never;

export type ObjectDefinitionToType<T extends ObjectDefinition> = {
  -readonly [key in keyof T]: DefinedType<T[key]>;
};

type DT = DefinedType<{ array: "string" }>;
