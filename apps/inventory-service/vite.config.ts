import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // setupFiles: "test/load-env.ts",
    globals: true,
  },
});
