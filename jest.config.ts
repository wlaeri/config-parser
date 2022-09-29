import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  modulePathIgnorePatterns: ["<rootDir>/lib/*"],
  testMatch: [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
  ],
};

export default config;
