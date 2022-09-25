import { ArrayDefinition, ArrayDefinitionToType } from "./array";
import { ObjectDefinition, ObjectDefinitionToType } from "./object";
import {
  PrimitiveTypeUnion,
  PrimitiveTypeUnionToActualType,
} from "./primitive";

export type Definition =
  | ArrayDefinition
  | ObjectDefinition
  | PrimitiveTypeUnion;

export type DefinedType<T extends Definition> = T extends ArrayDefinition
  ? ArrayDefinitionToType<T>
  : T extends ObjectDefinition
  ? ObjectDefinitionToType<T>
  : T extends PrimitiveTypeUnion
  ? PrimitiveTypeUnionToActualType<T>
  : never;
