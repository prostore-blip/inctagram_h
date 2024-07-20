import { useEffect, useState } from 'react'

import Notief from '@/assets/icons/svg/fillBell.svg'
import NotiefWithCount from '@/assets/icons/svg/mask.svg'
import { Typography } from '@chrizzo/ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './header.module.scss'

const countNotifies = 1

export const Header = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  const router = useRouter()
  const isAuthMe = true
  const goToLogIn = () => {
    router.push('/signIn')
  }
  const goToSignUp = () => {
    router.push('/signUp')
  }
  const isNotiefShowStyle = isAuthMe ? '' : s.displaynone

  const toShowNotifiesHandler = () => {}

  useEffect(() => {
    if (!windowWidth) {
      setWindowWidth(window.innerWidth)
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <Typography variant={'large'}>
          <Link href={'/'}>Inctagram</Link>
        </Typography>
        <div className={s.buttonsBlock}>
          {windowWidth > 450 ? (
            <div className={`${s.noties} ${isNotiefShowStyle}`} onClick={toShowNotifiesHandler}>
              {countNotifies ? (
                <>
                  <span className={s.countNotifies}>{countNotifies}</span> <NotiefWithCount />{' '}
                </>
              ) : (
                <Notief />
              )}
            </div>
          ) : (
            <></>
          )}
          <div className={s.selectBlock}>select</div>
          {!isAuthMe && windowWidth > 680 && (
            <div className={s.buttonsContainer}>
              <button className={s.login} onClick={goToLogIn} type={'button'}>
                LogIn
              </button>
              <button className={s.signIn} onClick={goToSignUp} type={'button'}>
                SignUp
              </button>
            </div>
          )}
          {isAuthMe && windowWidth < 769 && <div className={s.dropDown}>***</div>}
        </div>
      </div>
    </div>
  )
}
