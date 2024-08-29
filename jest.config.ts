import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/"],
  moduleNameMapper: {
    "^@public/beyond_identity_api$": "<rootDir>/src/index.ts",
    "^@public/beyond_identity_api/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
