import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components/Layout/layout'
import { NextPage } from 'next'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
