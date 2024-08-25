import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/components/Layout/layout.module.scss'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()

  const style = data || isLoading ? '' : s.gridHaveOneCol
  const router = useRouter()
  const path = router.pathname

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
          {data && <Nav isSpecialAccount myProfileId={data.userId} />}
          <Main>{!(path === '/login' && data) && children}</Main>
        </>
      )}
    </div>
  )
}
