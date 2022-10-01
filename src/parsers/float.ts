import { ParserException } from '../exceptions'
import { EnvironmentVariableParser } from '../interfaces'

export const toFloat: EnvironmentVariableParser<number> = (
  value
): number | undefined => {
  if (typeof value === 'undefined') return
  const parsedValue = Number(value)
  if (isNaN(parsedValue)) throw new ParserException(value, 'float')
  return parsedValue
}
