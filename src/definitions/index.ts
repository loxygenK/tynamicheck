import { ArrayDefinition, ArrayDefinitionToType } from "./array";
import { ObjectDefinition, ObjectDefinitionToType } from "./object";
import { PrimitiveDefinition, PrimitiveDefinitionToType } from "./primitive";

export type Definition =
  | ArrayDefinition
  | ObjectDefinition
  | PrimitiveDefinition;

export type DefinedType<T extends Definition> = T extends ArrayDefinition
  ? ArrayDefinitionToType<T>
  : T extends ObjectDefinition
  ? ObjectDefinitionToType<T>
  : T extends PrimitiveDefinition
  ? PrimitiveDefinitionToType<T>
  : never;
