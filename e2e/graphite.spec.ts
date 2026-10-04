// Checks that an app using the Graphite registry renders both modes correctly.
// The page under test needs: the dark-mode toggle (aria-label "Toggle dark mode"),
// one default shadcn Button and one Input. Run against any Next.js or SvelteKit app:
//   E2E_URL=http://localhost:3000 E2E_PATH=/ npx playwright test -c e2e
import { test, expect, type Page } from "@playwright/test"

const PATH = process.env.E2E_PATH ?? "/"
const toggle = (page: Page) => page.getByRole("button", { name: "Toggle dark mode" })
const primary = (page: Page) =>
  page.locator('[data-slot="button"]:not([aria-label="Toggle dark mode"])').first()
const input = (page: Page) => page.locator('[data-slot="input"]').first()
const html = (page: Page) => page.locator("html")
const body = (page: Page) => page.locator("body")

test.use({ colorScheme: "light" })

test("light and dark mode use Graphite colours and the choice persists", async ({ page }) => {
  await page.goto(PATH)
  await expect(html(page)).not.toHaveClass(/dark/)
  await expect(body(page)).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(primary(page)).toHaveCSS("background-color", "rgb(102, 86, 200)")

  // retried: before hydration the click can land without a handler attached
  await expect(async () => {
    await toggle(page).click()
    await expect(html(page)).toHaveClass(/dark/, { timeout: 1000 })
  }).toPass()
  await expect(body(page)).toHaveCSS("background-color", "rgb(12, 15, 18)")
  await expect(primary(page)).toHaveCSS("background-color", "rgb(144, 132, 218)")

  await page.reload()
  await expect(html(page)).toHaveClass(/dark/)
})

test("dark is used when the system prefers dark", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark", baseURL: test.info().project.use.baseURL })
  const page = await ctx.newPage()
  await page.goto(PATH)
  await expect(html(page)).toHaveClass(/dark/)
  await ctx.close()
})

test("controls are at least 44px on touch screens", async ({ browser }) => {
  const ctx = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 }, baseURL: test.info().project.use.baseURL })
  const page = await ctx.newPage()
  await page.goto(PATH)
  for (const [name, el] of [["button", primary(page)], ["input", input(page)], ["toggle", toggle(page)]] as const) {
    await expect(el, `${name} should be on the page`).toBeVisible()
    const box = (await el.boundingBox())!
    expect(box.height, `${name} height`).toBeGreaterThanOrEqual(44)
    expect(box.width, `${name} width`).toBeGreaterThanOrEqual(44)
  }
  await ctx.close()
})
