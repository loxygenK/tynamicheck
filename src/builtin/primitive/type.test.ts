import { DefinedType } from "../../definitions/type";

describe("Primitive type definition", function () {
  it("can generate primitive type", () => {
    const _assertString: DefinedType<"string"> = "xyz";
    const _assertNumber: DefinedType<"number"> = 123;
    const _assertBigInt: DefinedType<"bigint"> = BigInt(456);
    const _assertSymbol: DefinedType<"symbol"> = Symbol("This is a symbol");
  });
});
