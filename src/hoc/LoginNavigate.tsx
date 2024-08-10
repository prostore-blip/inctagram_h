import { FC, PropsWithChildren } from 'react'

import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { useRouter } from 'next/router'

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter()
  const { data, isFetching } = useAuthMeQuery()

  if (isFetching) {
    return <div style={{ fontSize: '50px' }}>...Loading</div>
  }
  if (!data) {
    void router.push('/login')
  }

  return <>{children}</>
}
