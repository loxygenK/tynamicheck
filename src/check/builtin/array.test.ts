import { Definition } from "../../definitions";
import { FailureTestResult, testFailure, testSuccess } from "../test-result";
import { arrayDefinitionTester } from "./array";

describe("Array tester", () => {
  it("should always accept for empty array", () => {
    const nextFn = jest.fn((_def: Definition, _case: unknown) => {
      return testFailure("Boom");
    });

    const result = arrayDefinitionTester.test({ $array: "string" }, [], nextFn);

    expect(result.result).toBe("success");
    expect(nextFn).not.toBeCalled();
  });

  it("should accept arrays that if the tests for elements do not fail", () => {
    const nextFn = jest.fn((_def: Definition, _case: unknown) => {
      return testSuccess();
    });

    const result = arrayDefinitionTester.test(
      { $array: "string" },
      ["123", "456"],
      nextFn
    );

    expect(result.result).toBe("success");
    expect(nextFn).toBeCalledTimes(2);
  });

  it("should fail if the test case is not array", () => {
    const nextFn = jest.fn((_def: Definition, _case: unknown) => {
      return testFailure("Boom");
    });

    const definition = { $array: "string" } as const;
    const testcase = "abcdef";

    const result = arrayDefinitionTester.test(definition, testcase, nextFn);

    expect(result).toStrictEqual({
      result: "failure",
      reason: "The given value was not an array.",
      definition,
      testcase,
    } as FailureTestResult);
    expect(nextFn).toBeCalledTimes(0);
  });

  it("should fail with causedBy field if the tests for elements failed", () => {
    const nextFn = jest.fn((definition: Definition, testcase: unknown) => {
      return testFailure("Nested failure", { definition, testcase });
    });

    const definition = { $array: "string" } as const;
    const testcase = [123, 456];

    const result = arrayDefinitionTester.test(definition, testcase, nextFn);

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
    expect(nextFn).toBeCalledTimes(1);
  });

  it("should decline if the definition is not for array", () => {
    const nextFn = jest.fn((_def: Definition, _case: unknown) => {
      return testFailure("Boom");
    });

    const result = arrayDefinitionTester.test(
      { notForArray: "string" },
      [123],
      nextFn
    );
    expect(result.result).toBe("declined");
    expect(nextFn).not.toBeCalled();
  });
});
