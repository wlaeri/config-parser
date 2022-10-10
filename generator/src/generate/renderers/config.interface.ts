import { ConfigSchema } from '../../schema/schema.interface'
import { FILE_HEADER } from '../../common/constants'
import { mapType, PossiblePrimitive } from '../../common/types'
import { render } from '../../common/render'

interface EnvironmentVariable {
  name: string
  primitiveType: PossiblePrimitive
  showComments: boolean
  description?: string
  default?: PossiblePrimitive
  example?: PossiblePrimitive
}

export interface ConfigInterfaceProps {
  header: string
  environmentVariables: EnvironmentVariable[]
}

export const renderConfigInterface = (configSchema: ConfigSchema): string => {
  const environmentVariables: EnvironmentVariable[] = Object.keys(
    configSchema
  ).map((key) => {
    const {
      type,
      description,
      example,
      default: defaultValue,
    } = configSchema[key]
    return {
      name: key,
      primitiveType: mapType(type),
      showComments:
        typeof description === 'undefined' &&
        typeof example === 'undefined' &&
        typeof defaultValue === 'undefined',
      description,
      default: defaultValue,
      example,
    }
  })
  return render<ConfigInterfaceProps>(
    './generate/templates/config.interface.ts.hbs',
    {
      header: FILE_HEADER,
      environmentVariables,
    }
  )
}
