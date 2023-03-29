import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'

/**
 * Transforms string values to integers.
 *
 * @param {string} value The string value to parse.
 * @return {number} The parsed value as a number.
 * @throws {ParserException} If the value is unsupported.
 */
export const toInteger = (value: string): number => {
  const parsedValue = parseInt(value)
  const isDecimal = Number(value) !== parsedValue
  if (isNaN(parsedValue) || isDecimal)
    throw new ParserException(value, 'integer')
  return parsedValue
}

/**
 * Parses an envionment variable to an integer.
 *
 * @example
 * // returns 86400
 * parseToFloat('SECONDS_IN_A_DAY')
 * @param {string} key The `process.env` key to parse. For example,
 * suppose you wanted to parse `process.env.SECONDS_IN_A_DAY` to a
 * boolean value. The key here would be `SECONDS_IN_A_DAY`.
 * @throws {MissingEnvironmentVariableException} If the required key
 * is not set on `process.env`.
 * @throws {ParserException} If the value is unsupported.
 * @returns {number} The parsed integer value.
 */
export const parseToInteger = (key: string): number => {
  const variable = process.env[key]
  if (typeof variable === 'undefined')
    throw new MissingEnvironmentVariableException(key)
  return toInteger(variable)
}
