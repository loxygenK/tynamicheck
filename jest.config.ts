export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  "moduleFileExtensions": ["js", "ts"],
  transform: {
    "\\.ts$": "ts-jest"
  },
  verbose: true,
};
