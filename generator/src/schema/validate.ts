import Ajv from 'ajv'
import { ConfigSchema } from './schema.interface'
import schema from './schema.json'

const ajv = new Ajv()

/**
 * Validate the provided config schema against the JSON schema for configs.
 *
 * @param {ConfigSchema} configSchema The provided schema to validate.
 */
export const validateSchema = (configSchema: ConfigSchema): void => {
  ajv.validate(schema, configSchema)
}
