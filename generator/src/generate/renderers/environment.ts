import { ConfigSchema } from '../../schema/schema.interface'
import { FILE_HEADER } from '../../common/constants'
import { mapType, PossiblePrimitive } from '../../common/types'
import { render } from '../../common/render'
import { fileURLToPath } from 'url'
import path from 'path'

interface EnvironmentVariable {
  name: string
  primitiveType: PossiblePrimitive
}

export interface EnvironmentDeclarationProps {
  header: string
  environmentVariables: EnvironmentVariable[]
}

export const renderEnvironmentDeclaration = (
  configSchema: ConfigSchema
): string => {
  const environmentVariables: EnvironmentVariable[] = Object.keys(
    configSchema
  ).map((key) => {
    const { type } = configSchema[key]
    return {
      name: key,
      primitiveType: mapType(type),
    }
  })

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatePath = path.resolve(
    __dirname,
    '../templates/environment.d.ts.hbs'
  )

  return render<EnvironmentDeclarationProps>(templatePath, {
    header: FILE_HEADER,
    environmentVariables,
  })
}
