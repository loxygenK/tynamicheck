import {
  FinishedTestResult,
  isSuccess,
  ValueMatchTester,
} from "../definitions";
import { DefinedType } from "./type";

export function isStructureMatch<D, T extends Array<unknown>>(
  definition: D,
  testcase: unknown,
  testers: Array<ValueMatchTester>
): testcase is DefinedType<D, T> {
  return isSuccess(testStructureMatch(definition, testcase, testers));
}

export function testStructureMatch<D>(
  _definition: D,
  _testcase: unknown,
  _testers: Array<ValueMatchTester>
): FinishedTestResult {
  throw new Error("Unimplemented");
}
