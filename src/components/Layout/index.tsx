import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'

import { clsx } from 'clsx'

import { NextPage } from 'next'

import s from '@/components/Layout/layout.module.scss'
import { useAuthGetQuery } from '@/services'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthGetQuery({})

  //todo cleanup console.log
  console.log('Layout New', data, isLoading, isFetching)

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
