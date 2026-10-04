import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: ".",
  use: { baseURL: process.env.E2E_URL ?? "http://localhost:3000" },
})
