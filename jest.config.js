const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    // Apply path aliases for "@alias/module" imports.
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ["src"],
};
