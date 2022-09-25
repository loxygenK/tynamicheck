import { DefinedType, Definition } from "../../definitions/type";

export type ArrayDefinition = {
  $Array: Definition;
};

export type ArrayDefinitionToType<T extends ArrayDefinition> = Array<
  DefinedType<T["$Array"]>
>;
