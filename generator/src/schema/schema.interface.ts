export interface ConfigSchema {
  [k: string]:
    | {
        type: 'string'
        description?: string
        example?: string
        default?: string
      }
    | {
        type: 'boolean'
        description?: string
        example?: boolean
        default?: boolean
      }
    | {
        type: 'integer'
        description?: string
        example?: number
        default?: number
      }
    | {
        type: 'number'
        description?: string
        example?: number
        default?: number
      }
}
