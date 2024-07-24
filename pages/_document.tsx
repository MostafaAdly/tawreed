import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Scripts from 'components/scripts'
export default function Document() {

  return (
    <Html
      lang="ar" dir='rtl'
    >
      <Head>
        <script src="https://kit.fontawesome.com/e6c13277a1.js" crossOrigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
      </Head>
      <body className='bg-[#fefefe]'>
        <Main />
        <NextScript />
        <Scripts />
      </body>
    </Html>
  )
}