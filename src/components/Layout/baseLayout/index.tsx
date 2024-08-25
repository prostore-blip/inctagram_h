import { PropsWithChildren, ReactElement } from 'react'


import { NextPage } from 'next'
import { LayoutNew } from '../layoutNew'
import { Layout } from '..'


export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  console.log('BaseLayout')

  return <Layout>{children}</Layout>
}

export const GetLayout = (page: ReactElement) => {
  console.log('GetLayout')

  return <BaseLayout>{page}</BaseLayout>
}
