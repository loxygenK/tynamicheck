import { DefinedType } from "./type-definition";

// Some test cases have no assertion. This is intentional because they are meant to
// check whether the type checking is working properly, and it cannot be checked
// on the runtime of tests.
// However, the failure of type checking can be found during test since the jest checkstype
// type before the test.

describe("DefinedType", () => {
  it("can be generated from one-level constant", () => {
    const typeDefintion = {
      a: "string",
      b: "number",
      c: "bigint",
      d: "symbol",
    } as const;

    type Generated = DefinedType<typeof typeDefintion>;

    const _variable: Generated = {
      a: "This is a string",
      b: 123456,
      c: BigInt(789012),
      d: Symbol("This is a symbol"),
    };
  });

  it("can be generated from nested constant", () => {
    const partialDefinition = {
      id: "string",
      name: "string",
      age: "number",
      profileUrl: "string",
    } as const;

    const typeDefintion = {
      id: "string",
      caption: "string",
      author: partialDefinition,
    } as const;

    type Generated = DefinedType<typeof typeDefintion>;

    const _variable: Generated = {
      id: "image-1234abcd",
      caption: "A picture of some beautiful flowers",
      author: {
        id: "user-1234abcd",
        name: "John",
        age: 18,
        profileUrl: "https://example.com",
      },
    };
  });

  it("generates non-readonly type", () => {
    const typeDefinition = {
      levelOne: "string",
      nesting: {
        levelTwo: "string",
      },
    } as const;

    const variable: DefinedType<typeof typeDefinition> = {
      levelOne: "unchanged-levelOne",
      nesting: {
        levelTwo: "unchanged-levelTwo",
      },
    };

    variable.levelOne = "reassigned-levelOne";
    variable.nesting.levelTwo = "reassigned-levelTwo";

    expect(variable.levelOne).toBe("reassigned-levelOne");
    expect(variable.nesting.levelTwo).toBe("reassigned-levelTwo");
  });
});
