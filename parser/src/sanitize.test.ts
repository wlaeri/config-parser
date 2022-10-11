import { MissingEnvironmentVariableException } from './exceptions'
import { EnvironmentParser } from './interfaces'
import { sanitize } from './sanitize'

interface Config {
  APP_NAME: string
  PORT: number
}

describe('enforce function', () => {
  it(`returns the sanitized config object if the environment parser function
returns defined values for all config attributes`, () => {
    const parser: EnvironmentParser<Config> = () => {
      return {
        APP_NAME: 'test-app',
        PORT: 3000,
      }
    }
    expect(sanitize(parser)).toStrictEqual({
      APP_NAME: 'test-app',
      PORT: 3000,
    })
  })

  it(`throws an error if the environment parser function
returns undefined for any config attributes`, () => {
    const parser: EnvironmentParser<Config> = () => {
      return {
        APP_NAME: 'test-app',
        PORT: undefined,
      }
    }
    expect(() => sanitize(parser)).toThrow(MissingEnvironmentVariableException)
  })
})
