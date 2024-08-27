import { useState } from 'react'

import { RecoveryCodeExpired } from '@/assets/image/recoveryCodeExpired'
import { NativeConfirm } from '@/components/native-dialog/native-confirm'
import Spinner from '@/components/uikit-temp-replacements/spinner/Spinner'
import { EMAIL_KEY_FOR_PASSWORD_RESET } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { useForgotPasswordMutation } from '@/services/inctagram.auth.service'
import { Button, Typography } from '@chrizzo/ui-kit'
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
  ] = useForgotPasswordMutation()

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

  //todo replace dialogs with toasts
  return (
    <div className={s.flexColumn}>
      <NativeConfirm
        onClose={handleCloseSuccessDialog}
        open={showSuccessDialog}
        text={`${t.forgotPassword.startPage.successDialogText}
           ${localStorage.getItem(EMAIL_KEY_FOR_PASSWORD_RESET)}`}
      />
      <NativeConfirm
        onClose={() => setShowErrorDialog(false)}
        open={showErrorDialog}
        text={`${t.forgotPassword.startPage.errorDialogText}
           ${error && JSON.stringify(error)}`}
      />
      <Typography className={s.title} textAlign={'center'} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.text} textAlign={'center'} variant={'regular16'}>
        {text}
      </Typography>
      <Button className={s.resendButton} disabled={submitDisabled} onClick={makeResendEmailRequest}>
        {!isForgotPasswordLoading && t.forgotPassword.expiredLink.resendButtonCaption}
        {isForgotPasswordLoading && t.forgotPassword.common.inProgress}
        <Spinner active={isForgotPasswordLoading} size={16} />
      </Button>
      <RecoveryCodeExpired />
    </div>
  )
}
