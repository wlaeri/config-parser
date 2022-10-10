import * as fs from 'fs'
import * as path from 'path'
import { ValidConfigFileName, ValidConfigFileNames } from './constants'
import {
  MissingConfigFileException,
  MultipleConfigFileException,
} from './exceptions'

/**
 * Detect the config schema file in a given config directory.
 *
 * @param {string} configDirectory The relative path to the directory where the config schema file lives.
 * @throws {MissingConfigFileException} If unable to locate a valid config file.
 * @throws {MultipleConfigFileException} If multiple config files are located in the config directory.
 * @return {string} The absolute path to the config schema file.
 */
export const detectSchema = (configDirectory: string): string => {
  const configPath = path.resolve(process.cwd(), configDirectory)
  const configFiles: string[] = fs
    .readdirSync(configPath)
    .filter((fileName: string) =>
      ValidConfigFileNames.includes(fileName as ValidConfigFileName)
    )
  if (configFiles.length === 0) throw new MissingConfigFileException(configPath)
  if (configFiles.length > 1)
    throw new MultipleConfigFileException(configPath, configFiles)
  const configFile = configFiles[0]
  return path.resolve(configPath, configFile)
}
