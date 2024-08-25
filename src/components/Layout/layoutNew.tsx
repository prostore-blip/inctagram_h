import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/components/Layout/layout.module.scss'
import { useAuthGetQuery } from '@/services'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthGetQuery({})

  console.log('Layout New', data, isLoading, isFetching)

  const style = data || isLoading ? '' : s.gridHaveOneCol

  return (
    <div className={s.container + ' ' + style}>
      {isLoading ? (
        <>
          <header className={s.headerSkelet}></header>
          <nav className={s.navSkelet}></nav>
          <div className={s.mainSkelet}>LOADING</div>
        </>
      ) : (
        <>
          <Header isAuthMe={!!data} />
          {data && <Nav isSpecialAccount />}
          <Main>{children}</Main>
        </>
      )}
    </div>
  )
}
