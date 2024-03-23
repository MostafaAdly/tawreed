// ================================================================= [ Libraries ]

import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

// ================================================================= [ Assets ]

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


// -------------- IMPORTING PUBLICs
import '../public/Assets/FontAwesome/css/all.css'
import '../public/Global/css/style.css'
import '../styles/globals.css'
// -------------- 

// ================================================================= [ Main Application ]
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tawreed | توريد</title>
        {/* <Script src='https://kit.fontawesome.com/e6c13277a1.js' crossOrigin='anonymous' /> */}
      </Head>
      <Component {...pageProps} />
    </div>
  );
}