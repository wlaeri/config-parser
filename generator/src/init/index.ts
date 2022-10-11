import { makeDirectory, writeFiles } from '../common/fileSystem'
import inquirer from 'inquirer'
import { render } from './render'
import { generateConfig } from '../generate'

interface Answers {
  configDirectoryPath: string
  extension: 'YAML' | 'JSON'
  packageManager: 'yarn' | 'npm'
}

export const initializeConfigDirectory = (output: boolean) => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the relative path to your config directory?',
        default: './config',
        name: 'configDirectoryPath',
      },
      {
        type: 'list',
        message: 'Do you want to define your configuration in YAML or JSON?',
        default: 'YAML',
        name: 'extension',
        choices: ['YAML', 'JSON'],
      },
      {
        type: 'list',
        message: 'Which package manager are you using?',
        default: 'yarn',
        name: 'packageManager',
        choices: ['yarn', 'npm'],
      },
    ])
    .then((answers: Answers) => {
      const { files, absoluteConfigDirectoryPath } = render(answers)
      makeDirectory(absoluteConfigDirectoryPath)
      writeFiles(files, { disabled: !output })
      generateConfig(answers.configDirectoryPath, output)
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
}
