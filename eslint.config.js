import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["backend/services/*.js"],
    ignores: ["backend/services/*.test.js"],
    rules: {
      "no-magic-numbers": ["warn", {
        "ignore": [0, 1, -1],
        "ignoreArrayIndexes": true
      }],
      "id-length": ["warn", {
        "min": 2,
        "exceptions": ["i", "j", "k"]
      }],
      "no-unused-vars": "warn",
      "no-unreachable": "warn",
      "complexity": ["warn", { "max": 5 }],
      "max-lines-per-function": ["warn", {
        "max": 20,
        "skipBlankLines": true,
        "skipComments": true
      }]
    }
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly"
      }
    },
    rules: {}
  }
];