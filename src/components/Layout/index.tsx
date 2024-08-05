import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { useAuthMeQuery } from '@/services'
import { NextPage } from 'next'

import s from '@/components/Layout/layout.module.scss'

type Props = {
  showNav?: boolean
}
export const Layout: NextPage<PropsWithChildren<Props>> = ({ children, showNav = false }) => {
  const style = showNav ? '' : s.gridHaveOneCol
  const { data, isFetching } = useAuthMeQuery()

  if (isFetching) {
    return <div>!!!!!!!!Loading!!!!!!</div>
  }

  return (
    <div className={s.container + ' ' + style}>
      <Header isAuthMe={data} />
      {showNav && <Nav isSpecialAccount />}
      <Main>{children}</Main>
    </div>
  )
}
