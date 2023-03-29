import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'

/**
 * Transforms string values to booleans.
 *
 * Supports the following values:
 *   "true" ==> true & "false" ==> false &
 *   "yes"  ==> true & "no"    ==> false &
 *   "1"    ==> true & "0"     ==> false
 *
 * @example
 * // returns true
 * toBoolean('yes')
 * @param {string} value The string value to parse.
 * @return {boolean} The parsed value as a boolean.
 * @throws {ParserException} If the value is unsupported.
 */
export const toBoolean = (value: string): boolean => {
  const formattedValue = value.toLowerCase()
  if (
    formattedValue === 'true' ||
    formattedValue === '1' ||
    formattedValue === 'yes'
  )
    return true
  if (
    formattedValue === 'false' ||
    formattedValue === '0' ||
    formattedValue === 'no'
  )
    return false
  throw new ParserException(value, 'boolean')
}

/**
 * Parses an envionment variable to a boolean.
 *
 * Supports the following values:
 *   "true" ==> true & "false" ==> false &
 *   "yes"  ==> true & "no"    ==> false &
 *   "1"    ==> true & "0"     ==> false
 *
 * @example
 * // returns true
 * parseToBoolean('IS_LOGGING_ENABLED')
 * @param {string} key The `process.env` key to parse. For example,
 * suppose you wanted to parse `process.env.IS_LOGGING_ENABLED` to a
 * boolean value. The key here would be `IS_LOGGING_ENABLED`.
 * @return {boolean} The parsed boolean value.
 * @throws {MissingEnvironmentVariableException} If the required key
 * is not set on `process.env`.
 * @throws {ParserException} If the value is unsupported.
 */
export const parseToBoolean = (key: string): boolean => {
  const variable = process.env[key]
  if (typeof variable === 'undefined')
    throw new MissingEnvironmentVariableException(key)
  return toBoolean(variable)
}
