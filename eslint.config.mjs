import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
  ],
  rules: {
    "unicorn/prefer-structured-clone": "off",
    // rule overrides
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
