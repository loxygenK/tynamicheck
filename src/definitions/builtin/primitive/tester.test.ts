import { FailureTestResult } from "../../../check/test-result";
import { createTesterInvoker } from "../../../helper/tests/test-match-tester";
import { primitiveDefinitionTester } from "./tester";

describe("Primitive tester", function () {
  const invokeTester = createTesterInvoker(primitiveDefinitionTester);

  it("should accept usable primitive types", () => {
    expect(invokeTester("string", "abc").result.result).toBe("success");
    expect(invokeTester("number", 123).result.result).toBe("success");
    expect(invokeTester("bigint", BigInt(456)).result.result).toBe("success");
    expect(invokeTester("symbol", Symbol("abc")).result.result).toBe("success");
  });

  it("should decline if unknown type is used in definition", () => {
    expect(invokeTester("??????", 123).result.result).toBe("declined");
  });

  it("should decline if the definition type is not string", () => {
    expect(invokeTester({ a: "string" }, 123).result.result).toBe("declined");
  });

  it("should fail on not usable primitive type definition", () => {
    expect(invokeTester("function", "abc").result).toStrictEqual({
      result: "failure",
      reason: "The type 'function' cannot be used as a type.",
      definition: "function",
    });

    expect(invokeTester("object", "abc").result).toStrictEqual({
      result: "failure",
      reason: "The type 'object' cannot be used as a type.",
      definition: "object",
    });

    expect(invokeTester("undefined", "abc").result).toStrictEqual({
      result: "failure",
      reason: "The type 'undefined' cannot be used as a type.",
      definition: "undefined",
    });
  });

  it("should fail on not compatible primitive types", () => {
    expect(invokeTester("string", 123).result).toStrictEqual({
      result: "failure",
      reason: "Expected string, received number.",
      definition: "string",
      testcase: 123,
    } as FailureTestResult);

    expect(invokeTester("number", BigInt(456)).result).toStrictEqual({
      result: "failure",
      reason: "Expected number, received bigint.",
      definition: "number",
      testcase: BigInt(456),
    } as FailureTestResult);

    const symbol = Symbol("abc");
    expect(invokeTester("bigint", symbol).result).toStrictEqual({
      result: "failure",
      reason: "Expected bigint, received symbol.",
      definition: "bigint",
      testcase: symbol,
    } as FailureTestResult);

    expect(invokeTester("symbol", "abc").result).toStrictEqual({
      result: "failure",
      reason: "Expected symbol, received string.",
      definition: "symbol",
      testcase: "abc",
    } as FailureTestResult);
  });
});
