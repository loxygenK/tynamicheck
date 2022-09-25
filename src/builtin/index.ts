import { arrayDefinitionTester } from "./array/tester";
import { ArrayDefinition, ArrayDefinitionToType } from "./array/type";
import { objectDefinitionTester } from "./object/tester";
import { ObjectDefinition, ObjectDefinitionToType } from "./object/type";
import { primitiveDefinitionTester } from "./primitive/tester";
import {
  PrimitiveDefinition,
  PrimitiveDefinitionToType,
} from "./primitive/type";

export type BuiltinDefinitions =
  | ArrayDefinition
  | ObjectDefinition
  | PrimitiveDefinition;

export type BuiltInDefinedType<T> = T extends ArrayDefinition
  ? ArrayDefinitionToType<T>
  : T extends ObjectDefinition
  ? ObjectDefinitionToType<T>
  : T extends PrimitiveDefinition
  ? PrimitiveDefinitionToType<T>
  : never;

export const builtinTesters = [
  arrayDefinitionTester,
  objectDefinitionTester,
  primitiveDefinitionTester,
];
