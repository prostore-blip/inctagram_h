import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '../../node_modules/ui-kit/dist/style.css'
import '@/styles/_typography.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
