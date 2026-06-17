import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn"
    }
  },
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
        ...globals.jest
      }
    },
    rules: {}
  }
];