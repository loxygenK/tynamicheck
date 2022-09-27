import { Definition } from "../../integrator/type";

export type ObjectDefinition = { [key: string]: Definition };

export type ObjectDefinitionToType<T extends ObjectDefinition> = {
  -readonly [key in keyof T]: DefinedType<T[key]>;
};
