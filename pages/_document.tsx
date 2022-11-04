import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return <Html>
    <Head>
      <link rel="stylesheet" type="text/css" href="https://cdn.sup39.dev/css/index.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>;
}
