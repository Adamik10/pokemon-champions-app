import js from "@eslint/js"
import vue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Vue rules
  ...vue.configs["flat/recommended"],

  //  Vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // ✅ TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/multi-word-component-names": "off",
      "vue/require-prop-type-constructor": "off",
      "vue/require-default-prop": "off",
    },
  },
  {
    ignores: ["node_modules", "dist"],
  },
]
