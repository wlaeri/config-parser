import { ParserException } from "../exceptions";
import { toInteger } from "./integer";

describe("toInteger parser function", () => {
  it("can handle undefined", () => {
    expect(toInteger(undefined)).toStrictEqual(undefined);
  });

  it("properly parsers an integer string to a number", () => {
    expect(toInteger("1")).toStrictEqual(1);
  });

  it("supports hexadecimal strings", () => {
    expect(toInteger("0xA")).toStrictEqual(10);
  });

  it("throws if given a decimal value", () => {
    expect(() => toInteger("1.1")).toThrow(ParserException);
  });

  it("throws if given a non-numerical string", () => {
    expect(() => toInteger("not_a_number")).toThrow(ParserException);
  });
});
