import { PropsWithChildren, useEffect } from 'react'

import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Nav } from '@/components/nav'
import { authActions } from '@/services/auth.api'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/components/Layout/layout.module.scss'

import { useAppDispatch } from '../../../store'

export const LayoutNew: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching, isLoading } = useAuthMeQuery()
  const dispatch = useAppDispatch()
  const style = data || isLoading ? '' : s.gridHaveOneCol
  const router = useRouter()
  const path = router.pathname

  /**
   * диспатчим в ReduxSlice мою почту. Чтобы в других компонентах или страницах
   * не использовать запрос AuthMe, а вытянуть из Redux
   */
  useEffect(() => {
    if (data) {
      dispatch(authActions.setMyEmail({ authData: data }))
    }
  }, [data, dispatch])

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
          {data && <Nav isSpecialAccount myEmail={data.email} myProfileId={data.userId} />}
          <Main>{!(path === '/login' && data) && children}</Main>
        </>
      )}
    </div>
  )
}
