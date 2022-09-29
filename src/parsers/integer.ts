import { ParserException } from '../exceptions';
import { EnvironmentVariableParser } from '../interfaces';

export const toInteger: EnvironmentVariableParser<number> = (
  value,
): number | undefined => {
  if (typeof value === 'undefined') return;
  const parsedValue = parseInt(value);
  const isDecimal = Number(value) !== parsedValue;
  if (isNaN(parsedValue) || isDecimal)
    throw new ParserException(value, 'integer');
  return parsedValue;
};
