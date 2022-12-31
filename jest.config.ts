import { pathsToModuleNameMapper } from "ts-jest"
import { readConfigFile, parseJsonConfigFileContent, sys } from "typescript"
import type { Config } from "jest"

const configFile = readConfigFile("./tsconfig.src.json", sys.readFile)
if (typeof configFile.error !== "undefined") {
  throw new Error(`Failed to load tsconfig: ${configFile.error}`)
}

const { options } = parseJsonConfigFileContent(
  configFile.config,
  {
    fileExists: sys.fileExists,
    readFile: sys.readFile,
    readDirectory: sys.readDirectory,
    useCaseSensitiveFileNames: true,
  },
  __dirname
)

const jestConfig = {
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(test).+(ts)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  transform: {
    "^.+\\.(t|j)s$": "esbuild-jest" /* Replace with ts-jest as needed */,
  },
  moduleNameMapper: pathsToModuleNameMapper(options.paths ?? {}, {
    prefix: "<rootDir>",
  }),
} satisfies Config

export default jestConfig
