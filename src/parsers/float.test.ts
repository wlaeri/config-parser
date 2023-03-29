import {
  MissingEnvironmentVariableException,
  ParserException,
} from '../exceptions'
import { parseToFloat, toFloat } from './float'

describe('toFloat parser function', () => {
  it('properly parsers an integer string to a number', () => {
    expect(toFloat('1')).toStrictEqual(1)
  })

  it('properly parses a decimal value string to a number', () => {
    expect(toFloat('1.1')).toStrictEqual(1.1)
  })

  it('supports hexadecimal strings', () => {
    expect(toFloat('0xA')).toStrictEqual(10)
  })

  it('throws if given a non-numerical string', () => {
    expect(() => toFloat('not_a_number')).toThrow(ParserException)
  })
})

describe('parseToFloat function', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('properly handles missing environment variables', () => {
    process.env.SOME_FLOAT_VARIABLE = undefined
    expect(() => parseToFloat('SOME_FLOAT_VARIABLE')).toThrow(
      MissingEnvironmentVariableException
    )
  })

  it('properly parsers an integer string to a number', () => {
    process.env.SOME_FLOAT_VARIABLE = '1'
    expect(parseToFloat('SOME_FLOAT_VARIABLE')).toStrictEqual(1)
  })

  it('properly parses a decimal value string to a number', () => {
    process.env.SOME_FLOAT_VARIABLE = '1.1'
    expect(parseToFloat('SOME_FLOAT_VARIABLE')).toStrictEqual(1.1)
  })

  it('supports hexadecimal strings', () => {
    process.env.SOME_FLOAT_VARIABLE = '0xA'
    expect(parseToFloat('SOME_FLOAT_VARIABLE')).toStrictEqual(10)
  })

  it('throws if given a non-numerical string', () => {
    process.env.SOME_FLOAT_VARIABLE = 'not_a_number'
    expect(() => parseToFloat('SOME_FLOAT_VARIABLE')).toThrow(ParserException)
  })
})
