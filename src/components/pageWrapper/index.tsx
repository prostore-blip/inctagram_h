import { PropsWithChildren } from 'react'

export const PageWrapper = (props: PropsWithChildren) => {
  const { children } = props

  //todo add to Layout(s)?
  return (
    <>
      <div style={{ height: '100%' }}>{children}</div>
    </>
  )
}
