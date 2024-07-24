import { useEffect, useMemo, useState } from 'react'

import Notief from '@/assets/icons/svg/fillBell.svg'
import NotiefWithCount from '@/assets/icons/svg/mask.svg'
import { Button, Select, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './header.module.scss'

import FlagRu from '../../assets/icons/svg/flagRu.svg'
import FlagUa from '../../assets/icons/svg/flagUk.svg'

//заглушка. Эти данные должны приходить с сервера через RTKQ
const countNotifies = 0

//заглушка. Эти данные должны приходить с сервера
const flags = [
  {
    flag: <FlagRu />,
    lang: 'Русский',
  },
  {
    flag: <FlagUa />,
    lang: 'English',
  },
]
//заглушка. Эти данные должны приходить с сервера
const isAuthMe = true

export const Header = () => {
  //стейт контроля ширины окна
  const [windowWidth, setWindowWidth] = useState(0)
  //стейт контроля выбранного языка селекта. selectValue должен будет передаватсья на сервер
  const [selectValue, setSelectValue] = useState(flags[0].lang)
  // роутинги
  const router = useRouter()
  /**
   *Навигация на страницу логина
   */
  const goToLogIn = () => {
    router.push('/signIn')
  }
  /**
   * Навигация на страницу регистрации
   */
  const goToSignUp = () => {
    router.push('/signUp')
  }
  /**
   * стили нотификации: если есть, то показываем кружок
   */
  const isNotiefShowStyle = isAuthMe ? '' : s.displaynone
  /**
   * Функция клика по иконке нотификации. Возможно должна делать запрос на сервер за нотификациями
   */
  const toShowNotifiesHandler = () => {}

  /**
   * контроль за шириной окна. Массив зависимостей должен быть пустым, иначе
   * после каждого set'а будем вешать слушателей.
   */
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

  /**
   * мемоизированный массив с именами языка для селекта
   */
  const itemsForSelect = useMemo(() => {
    return flags.map(f => ({
      icon: f.flag,
      item: f.lang,
    }))
  }, [])

  /**
   * хендлер селекта, вытягиват выбранное значение.
   * @param e - value из селекта
   */
  const onChangeLanguageHandler = (e: string) => {
    setSelectValue(e)
  }

  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <Typography variant={'large'}>
          <Link href={'/'}>Inctagram</Link>
        </Typography>
        <div className={s.buttonsBlock}>
          {windowWidth > 450 ? (
            <button
              aria-label={'Notification'}
              className={clsx(s.noties, isNotiefShowStyle)}
              onClick={toShowNotifiesHandler}
              role={'button'}
              tabIndex={!countNotifies ? -1 : undefined}
              type={'button'}
            >
              {countNotifies ? (
                <>
                  <span className={s.countNotifies}>{countNotifies}</span> <NotiefWithCount />{' '}
                </>
              ) : (
                <Notief />
              )}
            </button>
          ) : (
            <></>
          )}
          <Select
            defaultValue={flags[0].lang}
            items={itemsForSelect}
            onValueChange={onChangeLanguageHandler}
            variant={`${(!isAuthMe && windowWidth < 420) || (isAuthMe && windowWidth < 661) ? 'small' : 'large'}`}
          />
          {!isAuthMe && windowWidth > 780 && (
            <div className={s.buttonsContainer}>
              <Button className={s.login} onClick={goToLogIn} type={'button'}>
                <Typography variant={'h3'}> LogIn </Typography>
              </Button>
              <Button className={s.signIn} onClick={goToSignUp} type={'button'}>
                <Typography variant={'h3'}> SignUp </Typography>
              </Button>
            </div>
          )}
          {isAuthMe && windowWidth < 769 && <div className={s.dropDown}>***</div>}
        </div>
      </div>
    </div>
  )
}
