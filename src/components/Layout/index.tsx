import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/components/Layout/layout.module.scss'

type Props = {
  showNav?: boolean
}

export const Layout: NextPage<PropsWithChildren<Props>> = ({ children, showNav = false }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()
  const router = useRouter()

  // const style = data || isLoading ? '' : s.gridHaveOneCol

  if (!data && !isFetching) {
    void router.push('/login')

    return null
  }

  return (
    // <div className={s.container + ' ' + style}>
    //   {isLoading ? (
    //     <>
    //       <header className={s.headerSkelet}></header>
    //       <nav className={s.navSkelet}></nav>
    //       <div className={s.mainSkelet}>LOADING</div>
    //     </>
    //   ) : (
    //     <>
    //       <Header isAuthMe={!!data} />
    //       {data && <Nav isSpecialAccount />}
    //       <Main>{children}</Main>
    //     </>
    //   )}
    // </div>

    <>{!isFetching && children}</>
  )
}
