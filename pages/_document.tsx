import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {

  return (
    <Html
      lang="ar" dir='rtl'
    >
      <Head>
        <script src="https://kit.fontawesome.com/e6c13277a1.js" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}