const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://delta.band',
  pagesDirectory: `${__dirname}\\pages`,
  targetDirectory: 'static/',
  ignoredExtensions: [
    'png',
    'jpg',
    'svg'
  ]
});
