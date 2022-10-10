export const ConfigSchemaTypes = [
  'string',
  'number',
  'boolean',
  'integer',
] as const
export type ConfigSchemaType = typeof ConfigSchemaTypes[number]

export const ParserFunctions = ['toBoolean', 'toFloat', 'toInteger'] as const
export type ParserFunction = typeof ParserFunctions[number]

export const TypeScriptPrimitiveTypes = [
  'number',
  'string',
  'boolean',
  'bigint',
  'symbol',
  'undefined',
  'null',
] as const
export type TypeScriptPrimitiveType = typeof TypeScriptPrimitiveTypes[number]

const typeMap: Record<ConfigSchemaType, TypeScriptPrimitiveType> = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  integer: 'number',
}

export type PossiblePrimitive = string | number | boolean

/**
 * Maps a config schema type to a TypeScript primitive type.
 *
 * @param {ConfigSchemaType} type The config schema type provided.
 * @return {TypeScriptPrimitiveType} The TypeScript primitive type the provided config schema type maps to.
 */
export const mapType = (type: ConfigSchemaType): TypeScriptPrimitiveType => {
  return typeMap[type]
}

const parseFunctionMap: Record<ConfigSchemaType, ParserFunction | null> = {
  string: null,
  number: 'toFloat',
  boolean: 'toBoolean',
  integer: 'toInteger',
}

/**
 * Maps a config schema type to its necessary parser function.
 *
 * @param {ConfigSchemaType} type The config schema type provided.
 * @return {ParserFunction} The parser function the provided config schema type maps to.
 */
export const mapParseFunction = (
  type: ConfigSchemaType
): ParserFunction | null => {
  return parseFunctionMap[type]
}
