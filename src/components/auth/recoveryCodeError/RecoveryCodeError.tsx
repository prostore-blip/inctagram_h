import { useState } from 'react'

import { RecoveryCodeExpired } from '@/assets/image/recoveryCodeExpired'
import { EMAIL_KEY_FOR_PASSWORD_RESET } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { usePasswordRecoveryMutation } from '@/services'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './recoveryCodeError.module.scss'

type Props = {
  text: string
  title: string
}

export function RecoveryCodeError({ text, title }: Props) {
  const [
    forgotPassword,
    { error, isLoading: isForgotPasswordLoading, isSuccess: isForgotPasswordSuccess },
  ] = usePasswordRecoveryMutation()

  const { t } = useTranslation()

  const { executeRecaptcha, loaded: recaptchaLoaded } = useReCaptcha()

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const makeResendEmailRequest = async () => {
    const email = localStorage.getItem(EMAIL_KEY_FOR_PASSWORD_RESET)

    if (!email || !recaptchaLoaded) {
      return
    }
    try {
      const recaptcha = await executeRecaptcha('submit')

      await forgotPassword({ email, recaptcha }).unwrap()
      setShowSuccessDialog(true)
    } catch (error) {
      setShowErrorDialog(true)
    }
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  const submitDisabled =
    isForgotPasswordLoading || !localStorage.getItem(EMAIL_KEY_FOR_PASSWORD_RESET)

  return (
    <div className={s.flexColumn}>
      <dialog
        className={clsx(showSuccessDialog && s.dialog)}
        open={showSuccessDialog}
        role={'alertdialog'}
      >
        <Typography variant={'h1'}>{t.forgotPassword.startPage.successDialogTitle}</Typography>
        <Typography variant={'regular16'}>
          {t.forgotPassword.startPage.successDialogText}
          {` ${localStorage.getItem(EMAIL_KEY_FOR_PASSWORD_RESET)}`}
        </Typography>
        <div className={s.flexFiller} />
        <div className={s.buttonContainer}>
          <Button onClick={handleCloseSuccessDialog} variant={'primary'}>
            OK
          </Button>
        </div>
      </dialog>
      <dialog
        className={clsx(showErrorDialog && s.dialog)}
        open={showErrorDialog}
        role={'alertdialog'}
      >
        <Typography variant={'h1'}>{t.forgotPassword.startPage.errorDialogTitle}</Typography>
        <Typography variant={'regular16'}>{t.forgotPassword.startPage.errorDialogText}</Typography>
        {/*todo remove*/}
        <Typography variant={'regular16'}>{error && JSON.stringify(error)}</Typography>
        <div className={s.flexFiller} />
        <div className={s.buttonContainer}>
          <Button onClick={() => setShowErrorDialog(false)} variant={'primary'}>
            OK
          </Button>
        </div>
      </dialog>
      <Typography className={s.title} textAlign={'center'} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.text} textAlign={'center'} variant={'regular16'}>
        {text}
      </Typography>
      <Button className={s.resendButton} disabled={submitDisabled} onClick={makeResendEmailRequest}>
        {!isForgotPasswordLoading && t.forgotPassword.expiredLink.resendButtonCaption}
        {isForgotPasswordLoading && t.forgotPassword.common.inProgress}
      </Button>
      <RecoveryCodeExpired />
    </div>
  )
}
