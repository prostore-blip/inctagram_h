import { PropsWithChildren } from 'react'

import { useAuthMeQuery } from '@/services'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type Props = {
  showNav?: boolean
}

export const Layout: NextPage<PropsWithChildren<Props>> = ({ children, showNav = false }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()

  // const style = data || isLoading ? '' : s.gridHaveOneCol

  // if (!data && !isFetching) {
  //   void router.push('/login')

  //   return null
  // }

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
