const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  html: true,
});
md.use(require('@sup39/markdown-it-attr'));
md.use(require('@sup39/markdown-it-block-tag'));
md.use(require('@sup39/markdown-it-inline-tag'), {
  alias: {
    '': 'span',
    '@': 'summary',
    'c': 'code',
  },
});
md.use(require('@sup39/markdown-it-katex'));
md.use(require('@sup39/markdown-it-cjk-breaks'), {either: true});

const anchor = require('markdown-it-anchor');
md.use(anchor, {
  level: 2,
  permalink: anchor.permalink.linkInsideHeader({
    placement: 'before',
    symbol: '',
  }),
});

module.exports = md;
