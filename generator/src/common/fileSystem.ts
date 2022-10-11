import * as fs from 'fs'

export interface WriteOptions {
  /**
   * If true, disables writing the file contents to the file system.
   * Useful for development without modifying the file system contents.
   */
  disabled: boolean
}

export interface File {
  path: string
  content: string
}

const writeFile = (
  content: string,
  filePath: string,
  options?: WriteOptions
): void => {
  if (options?.disabled) return console.log(`FILE: ${filePath}\n${content}`)
  fs.writeFileSync(filePath, content)
}

/**
 * A utility function to handle writing files to the file system.
 * @param {File[]} files The files to write to the file system.
 * @param {WriteOptions} [options]
 */
export const writeFiles = (files: File[], options?: WriteOptions): void => {
  files.map((file: File) => {
    writeFile(file.content, file.path, options)
  })
}

/**
 * A utility function to make a directory if it doesn't exist.
 * @param {string} path The absolute path of the directory to make.
 */
export const makeDirectory = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}
