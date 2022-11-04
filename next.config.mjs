import mdx from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import ExportHeadings from '@sup39/rehype-mdx-export-headings';
import ComponentWrapper from '@sup39/rehype-mdx-component-wrapper';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      () => remarkMdxFrontmatter({name: 'meta'}),
    ],
    rehypePlugins: [
      () => ExportHeadings({tags: ['h2'], name: 'headings'}),
      () => ComponentWrapper({props: ['headings', 'meta']}),
    ],
  },
});
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });
    return config;
  },
});
