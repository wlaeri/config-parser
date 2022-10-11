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
      const configFile =
        answers.extension === 'JSON' ? 'config.json' : 'config.yml'
      console.log(
        `\nCreated config directory at ${absoluteConfigDirectoryPath}.`
      )
      console.log(
        'Make sure to add the following script to the scripts object in your package.json:\n'
      )
      console.log(
        `  "config:generate": "@laeri/config-generator generate --directory ${answers.configDirectoryPath}"\n`
      )
      console.log(
        `That way you can run the following command to regenerate your config any time you update your ${configFile} file:\n`
      )
      console.log(`  $ ${answers.packageManager} run config:generate\n`)
    })
    .catch((error) => {
      console.log('ERROR: ', error)
    })
}
