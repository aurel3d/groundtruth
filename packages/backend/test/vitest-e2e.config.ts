import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    name: 'backend-e2e',
    root: '.',
    include: ['**/*.e2e-spec.ts'],
    environment: 'node',
    globals: true,
    setupFiles: [resolve(__dirname, '../src/test-setup.ts')],
  },
  resolve: {
    alias: {
      '@groundtruth/shared': resolve(__dirname, '../../shared/src/index.ts'),
    },
  },
})
