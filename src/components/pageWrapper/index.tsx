import { PropsWithChildren } from 'react'

export const PageWrapper = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <>
      <div style={{ height: '100%' }}>{children}</div>
    </>
  )
}
