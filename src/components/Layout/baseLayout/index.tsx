import { PropsWithChildren, ReactElement } from 'react'


import { NextPage } from 'next'
import { LayoutNew } from '..'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  console.log('BaseLayout')

  return <LayoutNew>{children}</LayoutNew>
}

export const GetLayout = (page: ReactElement) => {
  console.log('GetLayout')

  return <BaseLayout>{page}</BaseLayout>
}
