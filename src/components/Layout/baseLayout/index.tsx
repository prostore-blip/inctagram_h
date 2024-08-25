import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  console.log('BaseLayout')

  return <Layout>{children}</Layout>
}

export const GetLayout = (page: ReactElement) => {
  console.log('GetLayout')

  return <BaseLayout>{page}</BaseLayout>
}
