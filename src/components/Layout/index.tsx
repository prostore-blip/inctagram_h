import { PropsWithChildren } from 'react'

import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useAuthMeQuery()
  const router = useRouter()

  if (router.pathname === '/') {
    return <>{children}</>
  }
  if (!data && !isFetching) {
    void router.push('/login')

    return null
  }

  return <>{!isFetching && children}</>
}
