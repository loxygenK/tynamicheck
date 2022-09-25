import {
  FailureTestResult,
  testFailure,
  testSuccess,
} from "../../definitions/tester/test-result";
import { Definition } from "../../definitions/type";
import { createTesterInvoker } from "../../helper/tests/test-match-tester";
import { arrayDefinitionTester } from "./tester";

describe("Array tester", () => {
  const invokeTester = createTesterInvoker(arrayDefinitionTester);

  it("should always accept for empty array", () => {
    const { result, mockNextFn } = invokeTester(
      { $array: "string" },
      [],
      testFailure("Boom")
    );

    expect(result.result).toBe("success");
    expect(mockNextFn).not.toBeCalled();
  });

  it("should accept arrays that if the tests for elements do not fail", () => {
    const { result, mockNextFn } = invokeTester(
      { $array: "string" },
      ["123", "456"],
      testSuccess()
    );

    expect(result.result).toBe("success");
    expect(mockNextFn).toBeCalledTimes(2);
  });

  it("should fail if the test case is not array", () => {
    const definition = { $array: "string" } as const;
    const testcase = "abcdef";

    const { result, mockNextFn } = invokeTester(
      definition,
      testcase,
      testFailure("boom")
    );

    expect(result).toStrictEqual({
      result: "failure",
      reason: "The given value was not an array.",
      definition,
      testcase,
    } as FailureTestResult);
    expect(mockNextFn).toBeCalledTimes(0);
  });

  it("should fail with causedBy field if the tests for elements failed", () => {
    const nextFn = (definition: Definition, testcase: unknown) => {
      return testFailure("Nested failure", { definition, testcase });
    };

    const definition = { $array: "string" } as const;
    const testcase = [123, 456];

    const { result, mockNextFn } = invokeTester(definition, testcase, nextFn);

    expect(result).toStrictEqual({
      result: "failure",
      reason: "The type of element 0 was not correct.",
      definition,
      testcase,
      causedBy: {
        result: "failure",
        reason: "Nested failure",
        definition: "string",
        testcase: 123,
      },
    } as FailureTestResult);
    expect(mockNextFn).toBeCalledTimes(1);
  });

  it("should decline if the definition is not for array", () => {
    const nextFn = jest.fn((_def: Definition, _case: unknown) => {
      return testFailure("Boom");
    });

    const { result, mockNextFn } = invokeTester(
      { notForArray: "string" },
      [123],
      nextFn
    );
    expect(result.result).toBe("declined");
    expect(mockNextFn).not.toBeCalled();
  });
});
