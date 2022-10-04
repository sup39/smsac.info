const fs = require('fs/promises');
const md = require('./mdi.config');
const sass = require('sass');
const {minify: htmlMinify} = require('html-minifier');

const path = require('path');
const fs0 = require('fs');

const meta = `
<meta charset="utf8">
<meta name="viewport" content="width=device-width,initial-scale=1">
`;
const headExtra = `
<link rel="stylesheet" type="text/css" href="/index.css">
<script src="/index.js"></script>
`;
module.exports = {
  name: 'SMS研究Info',
  rules: [
    {
      test: /\.md$/,
      output: '[name].html',
      async compile(src, dst, nav) {
        const raw = await fs.readFile(src, 'utf8');
        let html = md.render(raw);
        const head = html.match(/\<head\>([\s\S]*?)\<\/head\>/)?.[1];
        const body = html.replace(/<head>[\s\S]*?<\/head>/, '');
        html = `<html><head>${meta}${head}${headExtra}</head><body>${nav}<main>${body}</main></body></html>`;
        html = htmlMinify(html, {
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
        });
        await fs.writeFile(dst, html);
      },
    },
    {
      test: /\.s[ac]ss$/,
      output: '[name].css',
      async compile(src, dst, nav) {
        const r = sass.compile(src, {compressed: true});
        await fs.writeFile(dst, r.css);
      },
    },
  ],
};
