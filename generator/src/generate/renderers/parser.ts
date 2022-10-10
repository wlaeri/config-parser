import { ConfigSchema } from '../../schema/schema.interface'
import { FILE_HEADER } from '../../common/constants'
import { mapParseFunction } from '../../common/types'
import { render } from '../../common/render'

interface EnvironmentVariable {
  name: string
  parseExpression: string
}

export interface ParserProps {
  header: string
  environmentVariables: EnvironmentVariable[]
}

export const renderParser = (configSchema: ConfigSchema): string => {
  const environmentVariables: EnvironmentVariable[] = Object.keys(
    configSchema
  ).map((key) => {
    const { type } = configSchema[key]
    const parserFunction = mapParseFunction(type)
    const parseExpression = parserFunction
      ? `${parserFunction}(process.env.${key})`
      : `process.env.${key}`
    return {
      name: key,
      parseExpression,
    }
  })
  return render<ParserProps>('./generate/templates/parser.ts.hbs', {
    header: FILE_HEADER,
    environmentVariables,
  })
}
