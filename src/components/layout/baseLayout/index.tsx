import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components'
import { NextPage } from 'next'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const GetLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
