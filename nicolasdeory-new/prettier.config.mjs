/** @type {import('prettier').Config} */
export default {
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
