import { PropsWithChildren } from 'react'

import { HeadMeta } from '@/components/HeadMeta/headMeta'

export const PageWrapper = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <>
      <HeadMeta />
      <main>{children}</main>
    </>
  )
}
