const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://delta.band',
  pagesDirectory: `${__dirname}/pages`,
  targetDirectory: `${__dirname}/public`,
  ignoredExtensions: [
    'xml',
    'scss'
  ]
});
