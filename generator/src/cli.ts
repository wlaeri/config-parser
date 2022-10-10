import { Command } from 'commander'
import packageJson from '../package.json'
import { generateConfig } from './generate'
import { initializeConfigDirectory } from './init'

const program = new Command()

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)

program
  .command('generate')
  .description(
    'generate the TypeScript config client code from the config schema file'
  )
  .option(
    '-d --directory <string>',
    'the relative path to the config directory from the project root',
    './config'
  )
  .option(
    '--no-output',
    'prints the generated files to the console instead of writing to the file system'
  )
  .action((options: { directory: string; output: boolean }) => {
    generateConfig(options.directory, options.output)
  })

program
  .command('init')
  .description('initialize the config directory for the project')
  .action(() => {
    initializeConfigDirectory()
  })

export const runCli = () => {
  program.parse()
}
