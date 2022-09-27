import { ObjectDefinitionToType } from "./type";

describe("Object definition", function () {
  it("can generate one-level type", () => {
    const typeDefinition = {
      a: "string",
      b: "number",
      c: "bigint",
      d: "symbol",
    } as const;
    type Defined = ObjectDefinitionToType<typeof typeDefinition>;

    const _assert: Defined = {
      a: "This is a string",
      b: 123456,
      c: BigInt(789012),
      d: Symbol("This is a symbol"),
    };
  });

  it("can generate nested objects", () => {
    const partialDefinition = {
      id: "string",
      name: "string",
      age: "number",
      profileUrl: "string",
    } as const;

    const typeDefinition = {
      id: "string",
      caption: "string",
      author: partialDefinition,
    } as const;

    type Generated = ObjectDefinitionToType<typeof typeDefinition>;

    const _assert: Generated = {
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

    const variable: ObjectDefinitionToType<typeof typeDefinition> = {
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
