import { DefinedType, Definition } from "../../integrator/type";

export type ArrayDefinition = {
  $array: Definition;
};

export type ArrayDefinitionToType<T extends ArrayDefinition> = Array<
  DefinedType<T["$array"]>
>;
