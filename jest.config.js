module.exports = {
  moduleFileExtensions: ["js", "ts", "json"],
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/testing"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
};
