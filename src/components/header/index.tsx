import { useEffect, useMemo, useState } from 'react'

import Notief from '@/assets/icons/svg/fillBell.svg'
import NotiefWithCount from '@/assets/icons/svg/mask.svg'
import { DropDownHeader } from '@/components/dropDownHeader'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { Button, Select, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/components/header/header.module.scss'

import FlagRu from '../../assets/icons/svg/flagRu.svg'
import FlagUa from '../../assets/icons/svg/flagUk.svg'
//заглушка. Эти данные должны приходить с сервера через RTKQ
const countNotifies = 0

//заглушка
const flags = [
  {
    flag: <FlagRu />,
    language: 'Русский',
    locale: 'ru',
  },
  {
    flag: <FlagUa />,
    language: 'English',
    locale: 'en',
  },
]
//заглушка. Эти данные должны приходить с сервера
const isAuthMe = false

export const Header = ({ data1 }: { data1?: boolean }) => {
  //стейт контроля ширины окна
  const [windowWidth, setWindowWidth] = useState(0)
  const { t } = useTranslation()
  const { asPath, locale, pathname, push, query } = useRouter()

  // const { data } = useAuthMeQuery()

  const isAuthMe = data1
  /**
   *Навигация на страницу логина
   */
  const goToLogIn = () => {
    void push('/signIn')
  }
  /**
   * Навигация на страницу регистрации
   */
  const goToSignUp = () => {
    void push('/signUp')
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
      item: f.language,
    }))
  }, [])

  /**
   * хендлер селекта, вытягиват выбранное значение.
   * @param e - value из селекта
   */
  const onChangeLanguageHandler = (e: string) => {
    // setSelectValue(e)
    if (e === 'Русский') {
      void push({ pathname, query }, asPath, { locale: 'ru' })
    } else {
      void push({ pathname, query }, asPath, { locale: 'en' })
    }
  }

  const defaultLocale = flags.find(l => locale === l.locale)?.language

  return (
    <header className={s.header}>
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
            defaultValue={defaultLocale}
            items={itemsForSelect}
            onValueChange={onChangeLanguageHandler}
            variant={`${(!isAuthMe && windowWidth < 420) || (isAuthMe && windowWidth < 661) ? 'small' : 'large'}`}
          />
          {!isAuthMe && windowWidth > 780 && (
            <div className={s.buttonsContainer}>
              <Button className={s.login} onClick={goToLogIn} type={'button'} variant={'text'}>
                <Typography variant={'h3'}> {t.header.signInButton} </Typography>
              </Button>
              <Button className={s.signIn} onClick={goToSignUp} type={'button'}>
                <Typography variant={'h3'}> {t.header.signUpButton} </Typography>
              </Button>
            </div>
          )}
          {isAuthMe && windowWidth < 769 && (
            <div className={s.dropDown}>
              <DropDownHeader />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// <header className={s.header}>
//     header
//     <button onClick={() => push('/signIn')} type={'button'}>
//         {t.header.signInButton}
//     </button>
//     <button onClick={() => push('/signUp')} type={'button'}>
//         {t.header.signUpButton}
//     </button>
//     <select defaultValue={locale} onChange={changeLangHandler}>
//         {locales?.map(l => {
//             return (
//                 <option key={l} value={l}>
//                     {l}
//                 </option>
//             )
//         })}
//     </select>
// </header>
