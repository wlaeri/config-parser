/**
 * A function to parse an environment variable at runtime to a specified type.
 * @template T The type of the value after parsing.
 * Note:
 */
export interface EnvironmentVariableParser<T> {
  (value: string | undefined): T | undefined
}

/**
 * A function that specifies how to parse a config object from a process environment.
 * @template T The interface for the config object.
 */
export interface EnvironmentParser<T> {
  (): Partial<T>
}
