export const ValidConfigFileNames = [
  'config.json',
  'config.yml',
  'config.yaml',
] as const

export type ValidConfigFileName = typeof ValidConfigFileNames[number]
