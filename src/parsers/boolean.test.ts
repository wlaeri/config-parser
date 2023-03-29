import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'
import { parseToBoolean, toBoolean } from './boolean'

describe('toBoolean parser function', () => {
  it('properly parses "true" to true', () => {
    expect(toBoolean('true')).toStrictEqual(true)
  })

  it('properly parses "yes" to true', () => {
    expect(toBoolean('yes')).toStrictEqual(true)
  })

  it('properly parses "1" to true', () => {
    expect(toBoolean('1')).toStrictEqual(true)
  })

  it('properly parses "false" to false', () => {
    expect(toBoolean('false')).toStrictEqual(false)
  })

  it('properly parses "no" to false', () => {
    expect(toBoolean('no')).toStrictEqual(false)
  })

  it('properly parses "0" to false', () => {
    expect(toBoolean('0')).toStrictEqual(false)
  })

  it('throws if a value cannot be parsed into a boolean', () => {
    expect(() => toBoolean('not_a_bool')).toThrow(ParserException)
  })
})

describe('parseToBoolean function', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('properly handles missing environment variables', () => {
    process.env.SOME_BOOLEAN_VARIABLE = undefined
    expect(() => parseToBoolean('SOME_BOOLEAN_VARIABLE')).toThrow(
      MissingEnvironmentVariableException
    )
  })

  it('properly parses "true" to true', () => {
    process.env.SOME_BOOLEAN_VARIABLE = 'true'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(true)
  })

  it('properly parses "yes" to true', () => {
    process.env.SOME_BOOLEAN_VARIABLE = 'yes'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(true)
  })

  it('properly parses "1" to true', () => {
    process.env.SOME_BOOLEAN_VARIABLE = '1'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(true)
  })

  it('properly parses "false" to false', () => {
    process.env.SOME_BOOLEAN_VARIABLE = 'false'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(false)
  })

  it('properly parses "no" to false', () => {
    process.env.SOME_BOOLEAN_VARIABLE = 'no'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(false)
  })

  it('properly parses "0" to false', () => {
    process.env.SOME_BOOLEAN_VARIABLE = '0'
    expect(parseToBoolean('SOME_BOOLEAN_VARIABLE')).toStrictEqual(false)
  })

  it('throws if a value cannot be parsed into a boolean', () => {
    process.env.SOME_BOOLEAN_VARIABLE = 'not_a_bool'
    expect(() => parseToBoolean('SOME_BOOLEAN_VARIABLE')).toThrow(
      ParserException
    )
  })
})
