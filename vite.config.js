import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import GithubActionsReporter from 'vitest-github-actions-reporter'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    reporters: process.env.GITHUB_ACTIONS
      ? [new GithubActionsReporter(), 'json-summary', 'json']
      : 'default'
  },
});
