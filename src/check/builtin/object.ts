import { Definition } from "../../definitions";
import { TestResult } from "../test-result";
import { NextFunction, ValueMatchTester } from "../tester";

export const objectDefinitionTester: ValueMatchTester = {
  test(
    _definition: Definition,
    _testcase: unknown,
    _next: NextFunction
  ): TestResult {
    throw new Error("Unimplemented");
  },
};
