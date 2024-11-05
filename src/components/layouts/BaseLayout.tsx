import { PropsWithChildren } from 'react'

import { Header, Nav } from '@/components'
import { useAuthMeQuery } from '@/services'
import { clsx } from 'clsx'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import s from './baseLayout.module.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

//todo Main component and PageWrapper should be part of of one of the layouts
//currently Main doesn't do anything besides being main tag

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()
  const authenticated = !!data?.userId

  return (
    <div
      className={clsx(
        s.container,
        s.oneColumn,
        inter.className,
        (data || isLoading) && s.twoColumns
      )}
    >
      {isLoading && <AppInitializationSkeleton />}
      {!isLoading && (
        <>
          <Header isAuthMe={authenticated} />
          {authenticated && <Nav isSpecialAccount />}
          <main className={clsx(s.mainContent, !authenticated && s.marginAuto)}>{children}</main>
          <Toaster />
        </>
      )}
    </div>
  )
}

//todo ui-kit component using shadcn as example
function AppInitializationSkeleton() {
  return (
    <>
      <header className={s.headerSkeleton}></header>
      <nav className={s.navSkeleton}></nav>
      <div className={s.mainSkeleton}>LOADING</div>
    </>
  )
}

// export const PageWrapper = (props: PropsWithChildren) => {
//     const { children } = props
//
//     return (
//         <>
//             <div style={{ height: '100%' }}>{children}</div>
//         </>
//     )
// }

// export const Main: NextPage<PropsWithChildren> = ({ children }) => (
//     <main className={s.main}>{children}</main>
// )
