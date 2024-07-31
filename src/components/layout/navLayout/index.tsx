import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components'
import { NextPage } from 'next'

export const NavLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Layout showNav>{children}</Layout>
}

export const GetNavLayout = (page: ReactElement) => {
  return <NavLayout>{page}</NavLayout>
}
