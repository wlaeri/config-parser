import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'
import { parseToInteger, toInteger } from './integer'

describe('toInteger parser function', () => {
  it('properly parsers an integer string to a number', () => {
    expect(toInteger('1')).toStrictEqual(1)
  })

  it('supports hexadecimal strings', () => {
    expect(toInteger('0xA')).toStrictEqual(10)
  })

  it('throws if given a decimal value', () => {
    expect(() => toInteger('1.1')).toThrow(ParserException)
  })

  it('throws if given a non-numerical string', () => {
    expect(() => toInteger('not_a_number')).toThrow(ParserException)
  })
})

describe('parseToInteger function', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('properly handles missing environment variables', () => {
    process.env.SOME_INTEGER_VARIABLE = undefined
    expect(() => parseToInteger('SOME_INTEGER_VARIABLE')).toThrow(
      MissingEnvironmentVariableException
    )
  })

  it('properly parsers an integer string to a number', () => {
    process.env.SOME_INTEGER_VARIABLE = '1'
    expect(parseToInteger('SOME_INTEGER_VARIABLE')).toStrictEqual(1)
  })

  it('supports hexadecimal strings', () => {
    process.env.SOME_INTEGER_VARIABLE = '0xA'
    expect(parseToInteger('SOME_INTEGER_VARIABLE')).toStrictEqual(10)
  })

  it('throws if given a decimal value', () => {
    process.env.SOME_INTEGER_VARIABLE = '1.1'
    expect(() => toInteger('SOME_INTEGER_VARIABLE')).toThrow(ParserException)
  })

  it('throws if given a non-numerical string', () => {
    process.env.SOME_INTEGER_VARIABLE = 'not_a_number'
    expect(() => toInteger('SOME_INTEGER_VARIABLE')).toThrow(ParserException)
  })
})
