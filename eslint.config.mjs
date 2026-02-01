
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: [
      "src/components/ai-interview-coach/**/*.{ts,tsx}",
    ],
    rules: {
      // Allow apostrophes and similar characters in JSX text
      "react/no-unescaped-entities": "off",
      // We intentionally manage deps in effects with guards in realtime code
      "react-hooks/exhaustive-deps": "off",
      // Allow console logs during active interview sessions for telemetry/debugging
      "no-console": "off",
    },
  },
];

export default eslintConfig;
