import nextVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", "out/**", "build/**"],
  },
];

export default eslintConfig;
