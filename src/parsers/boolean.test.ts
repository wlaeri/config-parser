import { ParserException } from "../exceptions";
import { toBoolean } from "./boolean";

describe("toBoolean parser function", () => {
  it("can handle undefined", () => {
    expect(toBoolean(undefined)).toStrictEqual(undefined);
  });

  it('properly parses "true" to true', () => {
    expect(toBoolean("true")).toStrictEqual(true);
  });

  it('properly parses "yes" to true', () => {
    expect(toBoolean("yes")).toStrictEqual(true);
  });

  it('properly parses "1" to true', () => {
    expect(toBoolean("1")).toStrictEqual(true);
  });

  it('properly parses "false" to false', () => {
    expect(toBoolean("false")).toStrictEqual(false);
  });

  it('properly parses "no" to false', () => {
    expect(toBoolean("no")).toStrictEqual(false);
  });

  it('properly parses "0" to false', () => {
    expect(toBoolean("0")).toStrictEqual(false);
  });

  it("throws if a value cannot be parsed into a boolean", () => {
    expect(() => toBoolean("botBool")).toThrow(ParserException);
  });
});
