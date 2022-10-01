import { MissingEnvironmentVariableException } from './exceptions'
import { EnvironmentParser } from './interfaces'

/**
 * A function to ensure that all environment variables are present.
 * @template T The configuration object interface.
 * @param {EnvironmentParser<T>} parser The parser function to parse the
 * configuration object from the process environment.
 * @return {T} The sanitized configuration object.
 */
export const sanitize = <T>(parser: EnvironmentParser<T>): T => {
  const config = parser()
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new MissingEnvironmentVariableException(key)
    }
  }
  return config as T
}
