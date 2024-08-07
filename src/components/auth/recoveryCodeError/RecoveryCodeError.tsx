import { RecoveryCodeExpired } from '@/assets/image/recoveryCodeExpired'
import { useTranslation } from '@/hooks/useTranslation'
import { useRecoverPasswordMutation } from '@/services/inctagram.auth.service'
import { Button, Typography } from '@chrizzo/ui-kit'

import s from './RecoveryCodeError.module.scss'

type Props = {
  text: string
  title: string
}

export function RecoveryCodeError({ text, title }: Props) {
  const [recoverPassword] = useRecoverPasswordMutation()

  const { router, t } = useTranslation()

  const code = router.query.code
  const email = router.query.email

  // const grecaptcha = window?.grecaptcha || null

  const handleResendEmail = async () => {
    // console.log(grecaptcha)
    // if (typeof email !== 'string' || !grecaptcha || !process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY) {
    //   return
    // }
    try {
      // const res = await grecaptcha.execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY, {
      //   action: 'submit',
      // })
      //
      // console.log({ res })
      // .then(function (token: null | string) {
      //   if (token) {
      //     recoverPassword({ email, recaptcha: token })
      //   }
      // })
    } catch (err) {
      console.log('execute error', err)
    }
  }

  return (
    <div className={s.flexColumn}>
      {/*<Script*/}
      {/*  onReady={() => {*/}
      {/*    console.log(window?.grecaptcha)*/}
      {/*  }}*/}
      {/*  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`}*/}
      {/*/>*/}
      <Typography className={s.title} textAlign={'center'} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.text} textAlign={'center'} variant={'regular16'}>
        {text}
      </Typography>
      <Button className={s.resendButton} onClick={handleResendEmail}>
        {t.forgotPassword.expiredLink.resendButtonCaption}
      </Button>
      <RecoveryCodeExpired />
    </div>
  )
}
