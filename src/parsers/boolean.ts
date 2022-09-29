import { ParserException } from '../exceptions';
import { EnvironmentVariableParser } from '../interfaces';

/**
 * Transforms string values to booleans for environment variable parsing.
 * Supports the following values:
 *   "true" ==> true & "false" ==> false
 *   "yes"  ==> true & "no"    ==> false
 *   "1"    ==> true & "0"     ==> false
 * @throws {ParserException} If the value is unsupported.
 */
export const toBoolean: EnvironmentVariableParser<boolean> = (
  value,
): boolean | undefined => {
  if (typeof value === 'undefined') return;
  const formattedValue = value.toLowerCase();
  if (
    formattedValue === 'true' ||
    formattedValue === '1' ||
    formattedValue === 'yes'
  )
    return true;
  if (
    formattedValue === 'false' ||
    formattedValue === '0' ||
    formattedValue === 'no'
  )
    return false;
  throw new ParserException(value, 'boolean');
};
