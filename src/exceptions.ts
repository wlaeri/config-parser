/**
 * Thrown if a environment variable fails to parse.
 */
export class ParserException extends Error {
  /**
   * Creates an instance of ParserException.
   * @param {unknown} value The value being parsed.
   * @param {string} parsedType The expected type after parsing.
   */
  constructor(value: unknown, parsedType: string) {
    super(`Unable to parse ${value} of type ${typeof value} to ${parsedType}.`)
  }
}

/**
 * Thrown if an environment variable is missing.
 */
export class MissingEnvironmentVariableException extends Error {
  /**
   * Creates an instance of MissingEnvironmentVariableException.
   * @param {string} key The key of the environment variable that is missing.
   * For example, if `process.env.APP_NAME` is missing, the key would be
   * `APP_NAME`.
   */
  constructor(key: string) {
    super(`Required environment variable ${key} is not set.`)
  }
}
