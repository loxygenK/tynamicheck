import { PrimitiveDefinitionToType } from "./type";

describe("Primitive type definition", function () {
  it("can generate primitive type", () => {
    const _assertString: PrimitiveDefinitionToType<"string"> = "xyz";
    const _assertNumber: PrimitiveDefinitionToType<"number"> = 123;
    const _assertBigInt: PrimitiveDefinitionToType<"bigint"> = BigInt(456);
    const _assertSymbol: PrimitiveDefinitionToType<"symbol"> =
      Symbol("This is a symbol");
  });
});
