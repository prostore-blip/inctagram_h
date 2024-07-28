import { useRouter } from 'next/router'

import s from '@/components/header/header.module.scss'
export const Header = () => {
  const router = useRouter()

  return (
    <header className={s.header}>
      header
      <button onClick={() => router.push('/signIn')} type={'button'}>
        LogIn
      </button>
      <button onClick={() => router.push('/signUp')} type={'button'}>
        SignUp
      </button>
    </header>
  )
}
