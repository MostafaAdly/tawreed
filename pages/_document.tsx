import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import FooterComponent from './Customer/Global/FooterComponent'
import HeaderComponent from './Customer/Global/HeaderComponent'
export default function Document() {

  return (
    <Html
      lang="en" dir='rtl'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}