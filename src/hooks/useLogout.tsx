import { useLogoutMutation } from '@/services/inctagram.auth.service'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const router = useRouter()
  /**
   * вылогинивание
   */
  const [logout, { isLoading }] = useLogoutMutation()

  const getLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        void router.push('/login')
      })
  }

  return { getLogout, isLoading }
}
