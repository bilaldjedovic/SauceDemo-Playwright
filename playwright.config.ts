import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 40000,
  expect: {
    timeout: 20000
  },

  // Conditionally enable reporters based on an environment variable
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
  ],
});
