import type { AppProps } from 'next/app'

import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/services/store'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { NextPage } from 'next'

TimeAgo.addDefaultLocale(en)
import { Inter } from 'next/font/google'
import Head from 'next/head'

import '../styles/index.scss'
// eslint-disable-next-line import/extensions
import '@chrizzo/ui-kit/dist/style.css'
const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <Head>
        <style>{`
          body {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </Head>
      {getLayout(<Component {...props} />)}
    </Provider>
  )
}
