export default {
  // clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "@meu-pet/(.*)": "<rootDir>/src/$1",
  },
};
