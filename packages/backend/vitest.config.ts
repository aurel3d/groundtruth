import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    name: 'backend',
    root: './src',
    include: ['**/*.spec.ts'],
    environment: 'node',
    setupFiles: ['./test-setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['**/*.ts'],
      exclude: ['**/*.spec.ts', '**/index.ts'],
      reportsDirectory: '../coverage',
    },
  },
  resolve: {
    alias: {
      '@groundtruth/shared': resolve(__dirname, '../shared/src/index.ts'),
    },
  },
})
