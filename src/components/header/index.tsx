import { ChangeEvent } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

import s from '@/components/header/header.module.scss'

export const Header = () => {
  const { t } = useTranslation()
  const { asPath, locale, locales, pathname, push, query } = useRouter()
  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    void push({ pathname, query }, asPath, { locale })
  }

  return (
    <header className={s.header}>
      header
      <button onClick={() => push('/signIn')} type={'button'}>
        {t.header.signInButton}
      </button>
      <button onClick={() => push('/signUp')} type={'button'}>
        {t.header.signUpButton}
      </button>
      <select defaultValue={locale} onChange={changeLangHandler}>
        {locales?.map(l => {
          return (
            <option key={l} value={l}>
              {l}
            </option>
          )
        })}
      </select>
    </header>
  )
}
