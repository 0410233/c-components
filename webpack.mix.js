let mix = require('laravel-mix');

mix.js('src/c-pagination.js', 'dist').vue({
  extractStyles: 'css/c-pagination.css',
  // globalStyles: true,
  version: 2,
}).setPublicPath('dist');
