import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import LinearProgress from '@/components/uikit-temp-replacements/linear-progress/LinearProgress'
import { useMeQuery } from '@/services/inctagram.auth.service'
import { clsx } from 'clsx'
import { NextPage } from 'next'

import s from '@/components/Layout/layout.module.scss'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  // const { data, isFetching, isLoading } = useAuthMeQuery()
  const { data, isFetching, isLoading } = useMeQuery()

  //todo cleanup console.log
  console.log('Layout New', data, isLoading, isFetching)

  // const authorized = false
  const authorized = Boolean(data?.id)

  return (
    <div className={clsx(s.container, s.oneColumn, (authorized || isLoading) && s.twoColumns)}>
      <LinearProgress active={isLoading} thickness={3} />
      {isLoading && (
        <>
          <header className={s.headerSkeleton}></header>
          <nav className={s.navSkeleton}></nav>
          <div className={s.mainSkeleton}>LOADING</div>
        </>
      )}
      {!isLoading && (
        <>
          <Header isAuthMe={authorized} />
          {authorized && <Nav isSpecialAccount />}
          <Main>{children}</Main>
        </>
      )}
    </div>
  )
}

//other layouts are useless now
//todo redirects should go to middleware
//there is also a HOC \hoc\LoginNavigate (search, messenger, favorites pages) which should be replaced with middleware
