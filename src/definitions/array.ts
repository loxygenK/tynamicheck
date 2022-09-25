import { Definition } from "./type-definition";

export type ArrayDefinition = {
  $Array: Definition;
};

export type ArrayDefinitionToType<T extends ArrayDefinition> = Array<
  T["$Array"]
>;
