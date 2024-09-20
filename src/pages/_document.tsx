import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head>
        {/* Добавляем скрипт reCAPTCHA */}
        <script
          async
          defer
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
