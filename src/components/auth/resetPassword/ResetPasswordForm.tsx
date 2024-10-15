import { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ResetPasswordRequestData,
  resetPasswordFormSchema,
} from '@/components/auth/resetPassword/schema'
import { FormInput } from '@/components/controll/formTextField'
import { EMAIL_KEY_FOR_PASSWORD_RESET } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { useResetPasswordMutation } from '@/services'
import { isUnsuccessfulRequestResult } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './resetPasswordForm.module.scss'

import { AuthModalComponent } from '../authModal/AuthModalComponent'

export const ResetPasswordForm = () => {
  const [
    resetPassword,
    { error, isLoading: isResetPasswordLoading, isSuccess: isResetPasswordSuccess },
  ] = useResetPasswordMutation()

  const { router, t } = useTranslation()

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const { executeRecaptcha, loaded: recaptchaLoaded } = useReCaptcha()

  const token = typeof router?.query?.token === 'string' ? router.query.token : ''

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<ResetPasswordRequestData>({
    defaultValues: {
      password: '',
      recaptcha: '',
      repeatPassword: '',
      token,
    },
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const sendResetRequest = handleSubmit(async data => {
    if (!token) {
      return
    }

    try {
      await resetPassword(data).unwrap()

      setShowSuccessDialog(true)
      localStorage.removeItem(EMAIL_KEY_FOR_PASSWORD_RESET)
    } catch (error) {
      if (
        isUnsuccessfulRequestResult(error) &&
        error.data.statusCode === 401 &&
        error.data.message.toLowerCase().includes('invalid or expired')
      ) {
        await router.push('/auth/reset-password/invalid-token')
      } else {
        setShowErrorDialog(true)
      }
    }
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token || !recaptchaLoaded) {
      return
    }
    try {
      const recaptcha = await executeRecaptcha('submit')

      setValue('recaptcha', recaptcha)
      // await trigger('recaptcha')

      await sendResetRequest()
    } catch (error) {
      setShowErrorDialog(true)
    }
  }
  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false)
  }
  const handleCloseSuccessDialog = async () => {
    setShowSuccessDialog(false)
    // await router.push('/login')
  }
  //isResetPasswordLoading has a delay - the button seems to be disabled too late, isSubmitting works better
  const submitDisabled =
    isResetPasswordLoading || !isValid || !isDirty || isResetPasswordSuccess || isSubmitting

  //todo use replace dialogs
  return (
    <div className={s.wrapper}>
      <DevTool control={control} />
      <Card className={clsx(s.card, token === 'invalid-token' && s.hidden)} variant={'dark500'}>
        <Typography className={s.title} textAlign={'center'} variant={'h1'}>
          {t.forgotPassword.newPassword.title}
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <div className={s.wrap}>
            <FormInput
              control={control}
              error={errors.password?.message}
              label={t.signUp.passTitle}
              name={'password'}
              type={'password'}
            />
            <FormInput
              control={control}
              error={errors.repeatPassword?.message}
              label={t.signUp.confirmPass}
              name={'repeatPassword'}
              type={'password'}
            />
            <FormInput
              className={s.hidden}
              control={control}
              error={errors.recaptcha?.message}
              label={'Recaptcha'}
              name={'recaptcha'}
            />
            <Typography className={s.hint} textAlign={'start'} variant={'regular14'}>
              {t.forgotPassword.newPassword.hint}
            </Typography>
            <AuthModalComponent
              buttonText={t.forgotPassword.newPassword.createNewPassword}
              error={error}
              errorDialogText={t.forgotPassword.newPassword.errorDialogText}
              errorDialogTitle={t.forgotPassword.newPassword.errorDialogTitle}
              handleCloseDialog={handleCloseSuccessDialog}
              handleCloseErrorDialog={handleCloseErrorDialog}
              isSubmitting={isSubmitting}
              showErrorDialog={showErrorDialog}
              showSuccessDialog={showSuccessDialog}
              submitDisabled={submitDisabled}
              successDialogText={t.forgotPassword.newPassword.successDialogText}
              successDialogTitle={t.forgotPassword.newPassword.successDialogTitle}
              useLinkOnSuccess
            ></AuthModalComponent>
          </div>
        </form>
      </Card>
    </div>
  )
}
