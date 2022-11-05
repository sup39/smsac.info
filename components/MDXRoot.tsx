import Head from 'next/head';
import type {AppProps} from 'next/app';
import Nav from './Nav';
// import Footer from './Footer';
import MetaInfo from './MetaInfo';
import type {HeadingInfo} from '@sup39/rehype-mdx-export-headings';

export type MDXProps = {
  children: JSX.Element
  router: AppProps['router'],
  meta: Partial<{
    title: string
    description: string
    h1: string
    [key: string]: any
  }>
  headings: HeadingInfo[]
};

export default function MDXRoot({children, router: {pathname}, meta={}, headings}: MDXProps) {
  const {title, description} = meta;
  const h1 = meta.h1 ?? title;
  return <>
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
    <Nav pathname={pathname} headings={headings} />
    <main>
      <article>
        {h1 ? <h1>{h1}</h1> : <></>}
        <MetaInfo data={meta} />
        {children}
      </article>
    </main>
    {/* <Footer /> */}
  </>;
}
