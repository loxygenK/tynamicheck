import { DefinedType, Definition } from "../../index";

export type ArrayDefinition = {
  $Array: Definition;
};

export type ArrayDefinitionToType<T extends ArrayDefinition> = Array<
  DefinedType<T["$Array"]>
>;
