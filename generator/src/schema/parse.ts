import * as fs from 'fs'
import YAML from 'yaml'
import { detectSchema } from './detect'
import { ConfigSchema } from './schema.interface'
import { validateSchema } from './validate'

/**
 * Parse the config schema from a JSON or YAML file.
 *
 * @param {string} configDirectory The directory where the config schema file lives.
 * @return {ConfigSchema} The config schema object parsed from the config schema file.
 */
export const parseSchema = (configDirectory: string): ConfigSchema => {
  const configPath = detectSchema(configDirectory)
  const configFileContents = fs.readFileSync(configPath).toString()
  const extension = configPath.split('.')[1]
  let configSchema: ConfigSchema
  if (extension !== 'json') {
    configSchema = YAML.parse(configFileContents)
  } else {
    configSchema = JSON.parse(configFileContents)
  }
  validateSchema(configSchema)
  return configSchema
}
