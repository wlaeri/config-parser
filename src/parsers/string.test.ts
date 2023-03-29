import { MissingEnvironmentVariableException } from '../exceptions'
import { parseToString } from './string'

describe('parseToString function', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('properly handles missing environment variables', () => {
    process.env.SOME_STRING_VARIABLE = undefined
    expect(() => parseToString('SOME_STRING_VARIABLE')).toThrow(
      MissingEnvironmentVariableException
    )
  })

  it('properly parses a string', () => {
    process.env.SOME_STRING_VARIABLE = 'some_string'
    expect(parseToString('SOME_STRING_VARIABLE')).toStrictEqual('some_string')
  })
})
