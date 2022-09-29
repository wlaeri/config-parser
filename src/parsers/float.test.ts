import { ParserException } from "../exceptions";
import { toFloat } from "./float";

describe("toFloat parser function", () => {
  it("can handle undefined", () => {
    expect(toFloat(undefined)).toStrictEqual(undefined);
  });

  it("properly parsers an integer string to a number", () => {
    expect(toFloat("1")).toStrictEqual(1);
  });

  it("properly parses a decimal value string to a number", () => {
    expect(toFloat("1.1")).toStrictEqual(1.1);
  });

  it("supports hexadecimal strings", () => {
    expect(toFloat("0xA")).toStrictEqual(10);
  });

  it("throws if given a non-numerical string", () => {
    expect(() => toFloat("not_a_number")).toThrow(ParserException);
  });
});
