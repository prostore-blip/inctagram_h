import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

export const NavLayout: NextPage<PropsWithChildren> = ({ children }) => {
  console.log('NavLayout')

  return <Layout showNav>{children}</Layout>
}

export const GetNavLayout = (page: ReactElement) => {
  console.log('GetNavLayout')

  return <NavLayout>{page}</NavLayout>
}
