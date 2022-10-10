import inquirer from 'inquirer'

export const initializeConfigDirectory = () => {
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
    .then((answers) => {
      console.log('answers!', answers)
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}
