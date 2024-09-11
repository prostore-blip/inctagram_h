import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { useAuthGetQuery } from '@/services'
import { clsx } from 'clsx'
import { NextPage } from 'next'

import s from '@/components/Layout/layout.module.scss'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthGetQuery()

  return (
    <div className={clsx(s.container, s.oneColumn, (data || isLoading) && s.twoColumns)}>
      {isLoading && (
        <>
          <header className={s.headerSkeleton}></header>
          <nav className={s.navSkeleton}></nav>
          <div className={s.mainSkeleton}>LOADING</div>
        </>
      )}
      {!isLoading && (
        <>
          <Header isAuthMe={!!data} />
          {data && <Nav isSpecialAccount />}
          <Main>{children}</Main>
        </>
      )}
    </div>
  )
}
