import React from 'react';
import type {AppProps} from 'next/app';
import {MDXProvider} from '@mdx-js/react';
import {S} from '@/mdx';
import '../styles/index.sass';

// add anchor to all headings having id
const hx = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const extendedHx = Object.fromEntries(hx.map(H => [H,
  ({children, id, ...props}: React.ComponentProps<(typeof hx)[number]>) => <H id={id} {...props}>
    {id && <a className="anchor" href={'#'+encodeURIComponent(id)} />}
    {children}
  </H>,
]));

export default function App({Component, pageProps, router}: AppProps) {
  return <MDXProvider components={{S, ...extendedHx}}>
    <Component router={router} {...pageProps} />
  </MDXProvider>;
}
