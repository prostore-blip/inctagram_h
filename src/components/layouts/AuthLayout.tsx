import { PropsWithChildren } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { RECAPTCHA_KEY } from '@/const'
import { Typography } from '@chrizzo/ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import s from './authLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <BaseLayout>
      <ReCaptchaProvider language={router.locale} reCaptchaKey={RECAPTCHA_KEY}>
        <div className={s.flex}>
          {children}
          <RecaptchaConsent />
        </div>
      </ReCaptchaProvider>
    </BaseLayout>
  )
}

function RecaptchaConsent() {
  return (
    <div className={s.consent}>
      This site is protected by reCAPTCHA and the Google
      <Typography
        as={'a'}
        className={s.link}
        href={'https://policies.google.com/privacy'}
        variant={'smallLink'}
      >
        Privacy Policy
      </Typography>
      and
      <Typography
        as={'a'}
        className={s.link}
        href={'https://policies.google.com/terms'}
        variant={'smallLink'}
      >
        Terms of Service
      </Typography>
      apply.
    </div>
  )
}
