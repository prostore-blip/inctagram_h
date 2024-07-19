import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components/Layout/layout'
import { NextPage } from 'next'

export const NavLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout showNav>{children}</Layout>
}

export const getNavLayout = (page: ReactElement) => {
  return <NavLayout>{page}</NavLayout>
}
