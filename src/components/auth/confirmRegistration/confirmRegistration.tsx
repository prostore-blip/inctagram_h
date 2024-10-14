import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './confirmRegistration.module.scss'

export const ConfirmRegistration = () => {
  const { t } = useTranslation()

  return (
    <div className={s.mainContainer}>
      <div className={s.confirmContainer}>
        <Typography className={s.textTitle} variant={'h1'}>
          {t.signUp.congratulations}
        </Typography>
        <Typography className={s.textInfo}>{t.signUp.emailConfirmed}</Typography>
      </div>
      <Button as={Link} className={s.signInButton} href={'login'} variant={'primary'}>
        {t.signUp.signInButton}
      </Button>
      <Image
        alt={t.signUp.emailConfirmed}
        height={'300'}
        priority
        src={'/confirmRegistration.svg'}
        width={'432'}
      />
    </div>
  )
}
