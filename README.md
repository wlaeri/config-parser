# Config Parser

A set of utilities for parsing environment variables at runtime into type-safe configuration objects.

## Problem

The [Twelve-Factor App Methodology](https://12factor.net/config) prescribes storing configuration in the environment separate from the application code. However, it is impossible to know the types of the environment variables at runtime in a JavaScript application. For example, all of the keys of the `process.env` object in a Node.js runtime must be either `string` or `undefined`.

## Solution

By parsing the runtime environment variables into a typed object on application startup, we can adopt a [fail-fast](https://en.wikipedia.org/wiki/Fail-fast) design and guarantee type safety within the application code. This allows us to detect configuration issues on startup and enjoy the benefits of intelligent code completion.

## Installation

```sh
# Install with NPM
npm install --save @laeri/config-parser
```

```sh
# Install with Yarn
yarn add @laeri/config-parser
```

## Usage

### Specify the config object

The typed config object provides a place to document your environment variables in code. These comments should be available via intelligent code completion.

```ts
// config.ts

export const config = {
  /**
   * The name of the application.
   * @example "my-app"
   */
  applicationName: parseToString('APPLICATION_NAME'),
  /**
   * The port the application is listening for requests on.
   * @example 1337
   */
  port: parseToInteger('PORT'),
  /**
   * True if application tracing is enabled.
   * @example false
   */
  isTracingEnabled: parseToBoolean('IS_TRACING_ENABLED'),
}
```

> The parsing functions included in this utility library throw [exceptions](#exceptions) if the value is missing or cannot be parsed.

### Use the config object in your application

The config object is now ready to use anywhere you need it.

```ts
// server.ts

import { app } from './app'
import { config } from './config'

app.listen(config.port, () => {
  console.log(`Application listening on port ${config.port}.`)
})
```

> This library has no dependencies but it can be used in conjunction with libraries like [`dotenv`](https://github.com/motdotla/dotenv#readme).

### Prevent accessing `process.env` directly (optional)

You can add a [linter rule](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-env.md) to your `eslintrc.json` file to discourage accessing the `process.env` object directly.

```json
{
  "extends": [
        "eslint:recommended",
        "plugin:node/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "rules": {
        "node/no-process-env": ["error", "always"],
        ...
    }
}
```

> This linter rule requires [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node#-install--usage).

## Parsers

- `parseToString`: parses an environment variable to a `string` type (e.g. `"http://localhost" => "http://localhost"`)
- `toBoolean`: parses an environment variable to a `boolean` type (e.g. `"true" => true`)
- `toFloat`: parses an environment variable to a `number` type (e.g. `"12.75" => 12.75`)
- `toInteger`: parses an environment variable to an integer (e.g. `"42" => 42`)

## Exceptions

- `MissingEnvironmentVariableException`: thrown if an environment variable is missing
- `ParserException`: thrown if an environment variable fails to parse

## Contributions

Contributions are encouraged! Feel free to open a PR following our [contribution guidelines](./CONTRIBUTING.md) if you want to add a new parser.
