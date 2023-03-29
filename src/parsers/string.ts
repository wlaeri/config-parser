import { MissingEnvironmentVariableException } from '../exceptions'

/**
 * Parses an envionment variable to a string value.
 *
 * @example
 * // returns the parsed value of `process.env.DATABASE_HOST` e.g. "http://localhost"
 * parseToString('DATABASE_HOST')
 * @param {string} key The `process.env` key to parse. For example,
 * suppose you wanted to parse `process.env.DATABASE_HOST` to a
 * boolean value. The key here would be `DATABASE_HOST`.
 * @throws {MissingEnvironmentVariableException} If the required key
 * is not set on `process.env`.
 */
export const parseToString = (key: string): string => {
  const variable = process.env[key]
  if (typeof variable === 'undefined')
    throw new MissingEnvironmentVariableException(key)
  return variable
}
