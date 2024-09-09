import type { AppProps } from 'next/app'

import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { LayoutNew } from '@/components/Layout/layoutNew'
import { NextPage } from 'next'

import '../styles/index.scss'
// eslint-disable-next-line import/extensions
import '@chrizzo/ui-kit/dist/style.css'

import { wrapper } from '../../store'

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
      <LayoutNew>{getLayout(<Component {...props} />)}</LayoutNew>
    </Provider>
  )
}
