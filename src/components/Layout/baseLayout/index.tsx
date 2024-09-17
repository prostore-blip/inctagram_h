import { PropsWithChildren, ReactElement } from 'react'


import { NextPage } from 'next'
import { LayoutNew } from '../layoutNew'
import { Layout } from '..'


export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const GetLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
