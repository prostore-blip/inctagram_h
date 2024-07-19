import { PropsWithChildren } from 'react'

export const PageWrapper = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <>
      <main>{children}</main>
    </>
  )
}
