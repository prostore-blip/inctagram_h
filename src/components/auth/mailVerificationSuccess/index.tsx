import { memo } from 'react'

import ConfirmImg from '@/assets/image/confirmSuccess.png'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './mailVerificationSuccess.module.scss'

export const MailVerificationSuccess = memo(() => {
  const { t } = useTranslation()

  return (
    <div className={s.pageWrapper}>
      <div className={s.itemWrapper}>
        <Typography className={s.title} variant={'h1'}>
          {t.signUp.congratulations}
        </Typography>
        <Typography className={s.description} variant={'regular16'}>
          {t.signUp.emailConfirmed}
        </Typography>
        <Button as={Link} className={s.button} href={'/login'} variant={'primary'}>
          <Typography className={s.signin} variant={'h3'}>
            {t.signUp.signInButton}
          </Typography>
        </Button>
        <Image alt={'successful signup'} className={s.img} src={ConfirmImg} />
      </div>
    </div>
  )
})
