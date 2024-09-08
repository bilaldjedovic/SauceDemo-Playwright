import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 40000,
  expect: {
    timeout: 20000
  },
  workers: process.env.CI ? 4 : undefined,  // Use 4 workers for CI, defaults to available CPUs locally

  reporter: process.env.CI ? 'list' : [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});