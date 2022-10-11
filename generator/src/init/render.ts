import { File } from '../common/fileSystem'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

export interface RenderInput {
  configDirectoryPath: string
  extension: 'YAML' | 'JSON'
}

export interface RenderOutput {
  files: File[]
  absoluteConfigDirectoryPath: string
}

export const render = (input: RenderInput): RenderOutput => {
  const { configDirectoryPath, extension } = input
  const absoluteConfigDirectoryPath = path.resolve(
    process.cwd(),
    configDirectoryPath
  )

  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const indexPath = path.resolve(__dirname, './templates/index.ts.hbs')
  const jsonPath = path.resolve(__dirname, './templates/config.json.hbs')
  const yamlPath = path.resolve(__dirname, './templates/config.yml.hbs')

  const configFile: File =
    extension === 'JSON'
      ? {
          path: `${absoluteConfigDirectoryPath}/config.json`,
          content: fs.readFileSync(jsonPath).toString(),
        }
      : {
          path: `${absoluteConfigDirectoryPath}/config.yml`,
          content: fs.readFileSync(yamlPath).toString(),
        }

  const indexFile: File = {
    path: `${absoluteConfigDirectoryPath}/index.ts`,
    content: fs.readFileSync(indexPath).toString(),
  }

  return {
    files: [configFile, indexFile],
    absoluteConfigDirectoryPath,
  }
}
