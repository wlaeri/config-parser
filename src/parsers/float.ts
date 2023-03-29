import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'

/**
 * Transforms string values to floating point numbers.
 *
 * @param {string} value The string value to parse.
 * @return {number} The parsed value as a number.
 * @throws {ParserException} If the value is unsupported.
 */
export const toFloat = (value: string): number => {
  const parsedValue = Number(value)
  if (isNaN(parsedValue)) throw new ParserException(value, 'float')
  return parsedValue
}

/**
 * Parses an envionment variable to a floating point number.
 *
 * @example
 * // returns 4.99
 * parseToFloat('GAS_PRICE_PER_GALLON')
 * @param {string} key The `process.env` key to parse. For example,
 * suppose you wanted to parse `process.env.GAS_PRICE_PER_GALLON` to a
 * boolean value. The key here would be `GAS_PRICE_PER_GALLON`.
 * @return {number} The parsed floating point value.
 * @throws {MissingEnvironmentVariableException} If the required key
 * is not set on `process.env`.
 * @throws {ParserException} If the value is unsupported.
 */
export const parseToFloat = (key: string): number => {
  const variable = process.env[key]
  if (typeof variable === 'undefined')
    throw new MissingEnvironmentVariableException(key)
  return toFloat(variable)
}
