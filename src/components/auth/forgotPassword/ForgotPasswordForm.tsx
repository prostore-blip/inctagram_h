import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FieldName, useForm } from 'react-hook-form'

import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useRecoverPasswordMutation } from '@/services/inctagram.auth.service'
import { isFormError } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

import { RecoveryLinkRequestData, forgotPasswordFormSchema } from './schema'

export const ForgotPasswordForm = () => {
  const [recoverPassword, { isLoading, isSuccess }] = useRecoverPasswordMutation()

  const { router, t } = useTranslation()

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<RecoveryLinkRequestData>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordFormSchema),
  })
  const makeRequest = handleSubmit(async data => {
    try {
      await recoverPassword(data).unwrap()

      setShowSuccessDialog(true)
    } catch (error) {
      console.error('Failed to recover password:', error)
      if (isFormError(error)) {
        const field = error.data.messages[0].field
        const message = error.data.messages[0].message

        //todo get rid of type assertion
        setError(field as FieldName<RecoveryLinkRequestData>, { message, type: 'manual' })
      } else {
        setShowErrorDialog(true)
      }
    }
  })

  //inctagram.work/api won't accept the same token and responses with 403 if no code posted - hence reset
  //reset method won't trigger ReCaptcha onChange

  useEffect(() => {
    if (isSuccess && recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }, [isSuccess])

  const onCaptchaChange = async (recaptchaValue: null | string) => {
    setValue('recaptcha', recaptchaValue || '')
    await trigger('recaptcha')
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    setValue('recaptcha', '')
    //revalidate the form and disable submit button
    trigger('recaptcha')
  }

  const submitDisabled = !isDirty || !isValid || isLoading

  //todo replace native dialog with component
  return (
    <div className={s.wrapper}>
      <DevTool control={control} />
      <dialog
        className={clsx(showSuccessDialog && s.dialog)}
        open={showSuccessDialog}
        role={'alertdialog'}
      >
        <Typography variant={'h1'}>{t.forgotPassword.startPage.successDialogTitle}</Typography>
        <Typography variant={'regular16'}>
          {t.forgotPassword.startPage.successDialogText}
          {` ${getValues('email') || 'test@undefined.com'}`}
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
        <div className={s.flexFiller} />
        <div className={s.buttonContainer}>
          <Button onClick={() => setShowErrorDialog(false)} variant={'primary'}>
            OK
          </Button>
        </div>
      </dialog>
      <Card className={s.card} variant={'dark500'}>
        <Typography className={s.title} textAlign={'center'} variant={'h1'}>
          {t.forgotPassword.startPage.title}
        </Typography>
        <form className={s.form} onSubmit={makeRequest}>
          <div className={s.flexColumn}>
            <FormInput
              control={control}
              error={errors.email?.message}
              label={t.signUp.emailTitle}
              name={'email'}
              placeholder={'example@example.com'}
            />
            <FormInput
              className={s.hidden}
              control={control}
              error={errors.recaptcha?.message}
              label={'Captcha'}
              name={'recaptcha'}
            />
            <Typography className={s.hint} textAlign={'start'} variant={'regular14'}>
              {t.forgotPassword.startPage.hint}
            </Typography>
            {isSuccess && (
              <Typography textAlign={'start'} variant={'regular14'}>
                {t.forgotPassword.startPage.linkSent}
              </Typography>
            )}
            <Button className={s.submitButton} disabled={submitDisabled} type={'submit'}>
              {isSuccess && !isLoading && t.forgotPassword.startPage.sendLinkAgain}
              {!isSuccess && !isLoading && t.forgotPassword.startPage.sendLink}
              {isLoading && 'loading...'}
            </Button>
          </div>
        </form>
        <Button as={Link} className={s.linkButton} href={'/login'} variant={'text'}>
          {t.forgotPassword.startPage.backToSignIn}
        </Button>
        <div className={clsx(s.captchaWrapper)}>
          <ReCAPTCHA
            hl={router.locale}
            onChange={onCaptchaChange}
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || ''}
            size={'normal'}
            theme={'dark'}
            type={'image'}
          />
        </div>
      </Card>
    </div>
  )
}
