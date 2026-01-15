import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // Frontend package
  'packages/frontend',
  // Backend package with unit tests
  'packages/backend',
  // Shared package
  'packages/shared',
  // Backend E2E tests
  {
    extends: './packages/backend/test/vitest-e2e.config.ts',
    test: {
      name: 'backend-e2e',
      include: ['packages/backend/test/**/*.e2e-spec.ts'],
    },
  },
])
