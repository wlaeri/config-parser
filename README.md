# Config Parser

A set of utilities for parsing environment variables at runtime into type-safe configuration objects.

## Problem

The [Twelve-Factor App Methodology](https://12factor.net/config) prescribes storing configuration in the environment separate from the application code. However, it is impossible to know the types of the environment variables at runtime in a JavaScript application. For example, all of the keys of the `process.env` object in a Node.js runtime must be either `string` or `undefined`.

## Solution

By parsing the runtime environment variables into a typed object on application startup, we can adopt a [fail-fast](https://en.wikipedia.org/wiki/Fail-fast) design and guarantee type safety within the application code. This allows us to detect configuration issues on startup and enjoy the benefits of intelligent code completion. 

## Usage

### Project directory structure

```
/config
  environment.d.ts
  index.ts
  interface.ts
  parser.ts
```

### Declare the environment

An optional declaration file for the environment enables intelligent code completion for `process.env`.

```ts
// config/environment.d.ts

namespace NodeJS {
  interface ProcessEnv {
    APP_NAME: string;
    APP_PORT: string;
    IS_TRACING_ENABLED: string;
  }
}
```

### Specify the config interface

The interface for the config object provides a place to document your environment variables in code.

```ts
// config/interface.ts

export interface Config {
  /**
   * The name of the application.
   * @example "my-app"
   */
  applicationName: string;
  /**
   * The port the application is listening for requests on.
   * @example 1337
   */
  port: number;
  /**
   * True if application tracing is enabled.
   * @example false
   */
  isTracingEnabled: boolean;
}
```

### Define the parser function

Provide the function to parse your environment variables from strings to their expected types.

```ts
// config/parser.ts

import { Config } from './interface';
import { toInteger, toBoolean, EnvironmentParser } from '@laeri/config-parser';

export const parse: EnvironmentParser<Config> = () => {
  return {
    applicationName: process.env.APP_NAME,
    port: toInteger(process.env.APP_PORT),
    isTracingEnabled: toBoolean(process.env.IS_TRACING_ENABLED),
  };
};
```

### Pass the `parse` function to `sanitize`

This step ensures that an [exception](#exceptions) is thrown if the environment is not properly configured. 

```ts
// config/index.ts

import { sanitize } from '@laeri/config-parser';
import { parse } from './parser';
import * as dotenv from 'dotenv';

dotenv.config();
export const config = sanitize(parse);
```

> This library has no dependencies but it can be used in conjunction with libraries like [`dotenv`](https://github.com/motdotla/dotenv#readme).

### Use the config object in your application.

The config object is now typed and ready to use anywhere you need it.

```ts
// server.ts  

import { app } from './app'
import { config } from './config'

app.listen(config.port, () => {
  console.log(`Application listening on port ${config.port}.`)
})

```

## Parsers

- `toBoolean`: parses an environment variable to a `boolean` type (e.g. `"true" => true`)
- `toFloat`: parses an environment variable to a `number` type (e.g. `"12.75" => 12.75`)
- `toInteger`: parses an environment variable to an integer (e.g. `"42" => 42`)

## Exceptions

- `MissingEnvironmentVariableException`: thrown if an environment variable is missing
- `ParserException`: thrown if an environment variable fails to parse

## Contributions

Contributions are encouraged! Feel free to open a PR following our [contribution guidelines](./CONTRIBUTING.md) if you want to add a new parser.
