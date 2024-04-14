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
import { getImage } from '../public/Assets/Helpers'
// --------------

// ================================================================= [ Main Application ]
export default function MyApp({ Component, pageProps }: AppProps) {

  const description = `إفتح بوابة المستقبل في عملية الشراء! انضم إلينا لتتمتع بتوطين عمليتك بواسطة منصتنا المُشغَّلة بالذكاء الاصطناعي. قم بتبسيط سير العمل، وتعزيز علاقاتك مع المورّدين، وتأمين عمليات الشراء في أقل من ساعتين. استمتع بتوفير التكاليف على الشحن والموظفين، بالإضافة إلى الوصول إلى عروض أفضل. خذ السيطرة، وقم باتخاذ قرارات أكثر ذكاءً بسرعة، واستمتع بتجربة مستقبلية في عمليات الشراء من خلال تجربة مجانية!`;


  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Tawreed | توريد</title>
        <link rel="icon" type="image/x-icon" href={getImage("grey-logo.png")}></link>
        <meta name="keywords" content="Tawreed, توريد, مشتريات, مبيعات, مصر" />
        <meta name="description" content={description} />

        <meta property="og:title" content="Tawreed | توريد" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="http://adlyy.me:3000/api/v1/images/grey-logo.png" />
        <meta property="og:url" content="https://tec-tawreed.com/" />
        <meta property="og:site_name" content="T.E.C Tawreed" />
        <meta property="og:type" content="business.business" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tawreed | توريد" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="http://adlyy.me:3000/api/v1/images/grey-logo.png" />

        {/* <Script src='https://kit.fontawesome.com/e6c13277a1.js' crossOrigin='anonymous' />  */}
      </Head>
      <Component {...pageProps} />
    </div>
  );
}