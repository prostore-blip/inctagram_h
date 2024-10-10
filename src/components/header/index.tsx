import { useEffect, useMemo, useState } from 'react'

import { EnFlag } from '@/assets/icons/enFlag'
import { NotiefWithCount } from '@/assets/icons/notiefWithCount'
import { NotiefWithOutCount } from '@/assets/icons/notiefWithOutCount'
import { RuFlag } from '@/assets/icons/ruFlag'
import { DropDownHeader } from '@/components/dropDownHeader'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Select, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/components/header/header.module.scss'

//заглушка. Эти данные должны приходить с сервера через RTKQ
const countNotifies = 0

//Данные для селекта
const flags = [
  {
    flag: <RuFlag />,
    language: 'Русский',
    locale: 'ru',
  },
  {
    flag: <EnFlag />,
    language: 'English',
    locale: 'en',
  },
]

export const Header = ({ isAuthMe }: { isAuthMe?: boolean }) => {
  /**
   * стейт контроля ширины окна
   */
  const [windowWidth, setWindowWidth] = useState(0)
  /**
   * кастомный хук интернационализации
   */
  const { t } = useTranslation()
  /**
   * хук обработки URL
   */
  const { asPath, locale, pathname, push, query } = useRouter()

  /**
   *Навигация на страницу логина
   */
  const goToLogIn = () => {
    void push('/login')
  }
  /**
   * Навигация на страницу регистрации
   */
  const goToSignUp = () => {
    void push('/signUp')
  }
  /**
   * стили нотификации: если залогинен, то показываем кнопку нотификации
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
    //todo check this twice
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (e === 'Русский') {
      void push({ pathname, query }, asPath, { locale: 'ru' })
    } else {
      void push({ pathname, query }, asPath, { locale: 'en' })
    }
  }
  /**
   * дефолтный язык для селекта
   */
  const defaultLocale = flags.find(l => locale === l.locale)?.language

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Typography as={Link} href={'/'} variant={'large'}>
          Inctagram
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
                <NotiefWithOutCount />
              )}
            </button>
          ) : (
            <></>
          )}
          <Select
            className={s.select}
            defaultValue={defaultLocale}
            items={itemsForSelect}
            onValueChange={onChangeLanguageHandler}
            variant={`${
              (!isAuthMe && windowWidth < 420) || (isAuthMe && windowWidth < 661)
                ? 'small'
                : 'large'
            }`}
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
//     <button onClick={() => push('/logIn')} type={'button'}>
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
