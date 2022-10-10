import { compile } from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'

/**
 * A utility function to render file to a string from a Mustache template.
 *
 * @template T The type of the template-specific data to pass to the Mustache rendering engine.
 * @param {string} templatePath The relative path to the Mustache template from project root.
 * @param {T} data The template-specific data to pass to the Mustache rendering engine.
 * @return {string} The file contents rendered by Mustache as a string.
 */
export const render = <T>(templatePath: string, data: T): string => {
  const filePath = path.resolve(process.cwd(), templatePath)
  const template = compile(fs.readFileSync(filePath))
  return template(data)
}
