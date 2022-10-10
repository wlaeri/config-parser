import { ConfigSchema } from '../../schema/schema.interface'
import { FILE_HEADER } from '../../common/constants'
import { mapType, PossiblePrimitive } from '../../common/types'
import { render } from '../../common/render'

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
  return render<EnvironmentDeclarationProps>(
    './generate/templates/environment.d.ts.hbs',
    {
      header: FILE_HEADER,
      environmentVariables,
    }
  )
}
