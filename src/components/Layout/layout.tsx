import { PropsWithChildren } from 'react'

import { Header } from '@/components/Header/header'
import { Main } from '@/components/Main/main'
import { Nav } from '@/components/Nav/Nav'
import { NextPage } from 'next'

import s from '@/components/Layout/layout.module.scss'

type Props = {
  showNav?: boolean
}
export const Layout: NextPage<PropsWithChildren<Props>> = ({ children, showNav = false }) => {
  const style = showNav ? '' : s.gridHaveOneCol

  return (
    <div className={s.container + ' ' + style}>
      <Header />
      {showNav && <Nav isSpecialAccount />}
      <Main>{children}</Main>
    </div>
  )
}
