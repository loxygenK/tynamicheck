import {
  PrimitiveTypeUnion,
  PrimitiveTypeUnionToActualType,
} from "../utils/primitive-types";

export type Types = PrimitiveTypeUnion | TypeDefinition;
export type TypeDefinition = { [key: string]: Types };

export type DefinedType<T extends TypeDefinition> = {
  -readonly [key in keyof T]: T[key] extends TypeDefinition
    ? DefinedType<T[key]>
    : PrimitiveTypeUnionToActualType<T[key]>;
};
