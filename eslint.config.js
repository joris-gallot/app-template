import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  yaml: true,
  ignores: ['**/dist', '**/node_modules', '**/playwright-report', '**/test-results'],
  rules: {
    'no-restricted-imports': ['error', {
      paths: [
        {
          name: 'zod',
          message: 'Please use zod/v4 instead.',
        },
        {
          name: 'zod/v3',
          message: 'Please use zod/v4 instead.',
        },
      ],
    }],
  },
})
