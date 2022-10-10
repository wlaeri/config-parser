import { renderEnvironmentDeclaration } from './renderers/environment'
import { renderConfigInterface } from './renderers/config.interface'
import { renderParser } from './renderers/parser'
import { writeFiles } from '../common/fileSystem'
import { parseSchema } from '../schema/parse'

export const generateConfig = (
  configDirectory: string,
  output: boolean
): void => {
  const configSchema = parseSchema(configDirectory)
  const environmentDeclaration = renderEnvironmentDeclaration(configSchema)
  const configInterface = renderConfigInterface(configSchema)
  const parser = renderParser(configSchema)
  writeFiles(
    [
      {
        content: configInterface,
        path: `${configDirectory}/generated/config.interface.ts`,
      },
      {
        content: environmentDeclaration,
        path: `${configDirectory}/generated/environment.d.ts`,
      },
      {
        content: parser,
        path: `${configDirectory}/generated/parser.ts`,
      },
    ],
    { disabled: !output }
  )
}
