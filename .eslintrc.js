module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {
    // Disable unused vars warning for specific cases
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    // Allow any type in specific scenarios
    "@typescript-eslint/no-explicit-any": "off",
    // Add display name for components
    "react/display-name": "off",
    // Ignore unused parameters by prefixing with underscore
    "no-unused-vars": "off",
  },
};
