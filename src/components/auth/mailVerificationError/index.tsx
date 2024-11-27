import { memo } from 'react'

import ConfirmImg from '@/assets/image/confirmError.png'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './mailVerificationError.module.scss'

// type MailVerificationErrorProps = {
//   email: string
// }

export const MailVerificationError = memo(() => {
  const { t } = useTranslation()
  // const ['аналогично'] = 'название хука'()
  // const { push } = useRouter()

  const resendPasswordClick = async () => {
    try {
      // await 'название хука'({ параметры })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.itemWrapper}>
        <Typography className={s.title} variant={'h1'}>
          {t.signUp.emailExpired}
        </Typography>
        <Typography className={s.description} variant={'regular16'}>
          {t.signUp.expiredDescription}
        </Typography>
        <Button className={s.button} onClick={resendPasswordClick} variant={'primary'}>
          <Typography className={s.signin} variant={'h3'}>
            {t.signUp.resendVerificationLink}
          </Typography>
        </Button>
        <Image alt={'error signup'} className={s.img} src={ConfirmImg} />
      </div>
    </div>
  )
})
