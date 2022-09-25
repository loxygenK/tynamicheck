import { ValueMatchTester } from "../definitions";
import { DefinedType } from "./type";

export function testIsMatches<D, T extends Array<unknown>>(
  definition: D,
  testcase: unknown,
  _testers: Array<ValueMatchTester>
): testcase is DefinedType<D, T> {
  // TODO: Implement

  throw new Error("Unimplemented");
}
