import type { AppProps } from 'next/app'

import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { LayoutNew } from '@/components/Layout/layoutNew'
import { useTranslation } from '@/hooks/useTranslation'
import { NextPage } from 'next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import '../styles/index.scss'
// eslint-disable-next-line import/extensions
import '@chrizzo/ui-kit/dist/style.css'

import { wrapper } from '../services/store'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { router } = useTranslation()

  const { props, store } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ReCaptchaProvider
      language={router.locale}
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
    >
      <Provider store={store}>
        <LayoutNew>{getLayout(<Component {...props} />)}</LayoutNew>
      </Provider>
    </ReCaptchaProvider>
  )
}
