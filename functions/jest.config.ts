import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  testEnvironment: 'jest-environment-node',
  transformIgnorePatterns: ['node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)'],
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testTimeout: 120000,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/src/api/**/*.test.ts'],
}

export default config
