import type { AppProps } from 'next/app'

import '@/styles/_typography.scss'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
