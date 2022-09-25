import { ArrayDefinition, ArrayDefinitionToType } from "./builtin/array/type";
import {
  ObjectDefinition,
  ObjectDefinitionToType,
} from "./builtin/object/type";
import {
  PrimitiveDefinition,
  PrimitiveDefinitionToType,
} from "./builtin/primitive/type";

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
