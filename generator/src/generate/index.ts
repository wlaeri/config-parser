import { renderEnvironmentDeclaration } from './renderers/environment'
import { renderConfigInterface } from './renderers/config.interface'
import { renderParser } from './renderers/parser'
import { makeDirectory, writeFiles } from '../common/fileSystem'
import { parseSchema } from '../schema/parse'

export const generateConfig = (
  configDirectory: string,
  output: boolean
): void => {
  const { absoluteConfigDirectoryPath, configSchema } =
    parseSchema(configDirectory)
  const environmentDeclaration = renderEnvironmentDeclaration(configSchema)
  const configInterface = renderConfigInterface(configSchema)
  const parser = renderParser(configSchema)
  makeDirectory(`${absoluteConfigDirectoryPath}/generated`)
  writeFiles(
    [
      {
        content: configInterface,
        path: `${absoluteConfigDirectoryPath}/generated/config.interface.ts`,
      },
      {
        content: environmentDeclaration,
        path: `${absoluteConfigDirectoryPath}/generated/environment.d.ts`,
      },
      {
        content: parser,
        path: `${absoluteConfigDirectoryPath}/generated/parser.ts`,
      },
    ],
    { disabled: !output }
  )
}
