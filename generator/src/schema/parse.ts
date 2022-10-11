import * as fs from 'fs'
import YAML from 'yaml'
import { detectSchema } from './detect'
import { ConfigSchema } from './schema.interface'
import { validateSchema } from './validate'

export interface ParsedSchema {
  /**
   * The config schema object parsed from the config schema file.
   */
  configSchema: ConfigSchema
  /**
   * The absolute path to the config directory.
   */
  absoluteConfigDirectoryPath: string
}

/**
 * Parse the config schema from a JSON or YAML file.
 *
 * @param {string} configDirectory The directory where the config schema file lives.
 * @return {ParsedSchema} The config schema object parsed from the config schema file
 * and the absolute path to the config directory.
 */
export const parseSchema = (configDirectory: string): ParsedSchema => {
  const { absoluteConfigDirectoryPath, absoluteConfigSchemaFilePath } =
    detectSchema(configDirectory)
  const configFileContents = fs
    .readFileSync(absoluteConfigSchemaFilePath)
    .toString()
  const extension = absoluteConfigSchemaFilePath.split('.')[1]
  let configSchema: ConfigSchema
  if (extension !== 'json') {
    configSchema = YAML.parse(configFileContents)
  } else {
    configSchema = JSON.parse(configFileContents)
  }
  validateSchema(configSchema)
  return {
    configSchema,
    absoluteConfigDirectoryPath,
  }
}
