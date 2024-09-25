import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { useAuthMeQuery } from '@/services'
import { clsx } from 'clsx'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'

import s from '@/components/Layout/layout.module.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()

  return (
    <div
      className={clsx(
        s.container,
        s.oneColumn,
        inter.className,
        (data || isLoading) && s.twoColumns
      )}
    >
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
