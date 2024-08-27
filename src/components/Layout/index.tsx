import { PropsWithChildren } from 'react'

import { useMeQuery } from '@/services/inctagram.auth.service'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const privateRoutes = ['profile/settings']

type Props = {
  showNav?: boolean
}

export const Layout: NextPage<PropsWithChildren<Props>> = ({ children, showNav = false }) => {
  const { data, isFetching, isLoading } = useMeQuery()
  const router = useRouter()

  //todo create middleware for redirects
  //this layout is useless - loading now displayed in LayoutNew and redirects should go to middleware
  //the app has public pages - it is not right to redirect to /login blindly

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
