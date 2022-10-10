import { ValidConfigFileNames } from './constants'

export class MissingConfigFileException extends Error {
  constructor(configDirectory: string) {
    super(
      `Unable to find a config file (e.g. ${ValidConfigFileNames.join(
        ', '
      )}, etc.) in ${configDirectory}.`
    )
  }
}

export class MultipleConfigFileException extends Error {
  constructor(configDirectory: string, configFiles: string[]) {
    super(
      `Found multiple config files ${ValidConfigFileNames.join(
        ' and '
      )} in ${configDirectory}.`
    )
  }
}
