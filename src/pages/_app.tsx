import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'

import '../styles/index.scss'
// eslint-disable-next-line import/extensions
import '@chrizzo/ui-kit/dist/style.css'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(<Component {...pageProps} />)
}
