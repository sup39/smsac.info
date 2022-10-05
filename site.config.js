const fs = require('fs/promises');
const md = require('./mdi.config');
const sass = require('sass');
const {minify: htmlMinify} = require('html-minifier');

const path = require('path');
const fs0 = require('fs');

const meta = `
<meta charset="utf8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="icon" type="image/png" href="/assets/favicon.png">
`;
const headExtra = `
<link rel="stylesheet" type="text/css" href="/assets/index.css">
<script src="/assets/index.js"></script>
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
        html = html.replace(
          /<style\s+lang="(s[ac]ss)">([\s\S]*?)<\/style>/g,
          (_, lang, s) => `<style>${sass.compileString(s, {syntax: lang==='sass'?'indented':'scss'}).css}</style>`,
        );
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
