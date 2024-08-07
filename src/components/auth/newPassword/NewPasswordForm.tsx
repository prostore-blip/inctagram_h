import { useState } from 'react'
import { FieldName, useForm } from 'react-hook-form'

import { NewPasswordFormData, newPasswordSchema } from '@/components/auth/newPassword/schema'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useSetNewPasswordMutation } from '@/services/inctagram.auth.service'
import { isFormError } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { omit } from 'remeda'

import s from './newPassword.module.scss'

export const NewPasswordForm = () => {
  const [setNewPassword, { isLoading, isSuccess }] = useSetNewPasswordMutation()

  const { router, t } = useTranslation()

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const recoveryCode = typeof router.query?.code === 'string' ? router.query?.code : ''

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setError,
  } = useForm<NewPasswordFormData>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      recoveryCode: recoveryCode,
    },
    resolver: zodResolver(newPasswordSchema),
  })

  const sendRequest = handleSubmit(async data => {
    if (!recoveryCode) {
      return
    }
    try {
      await setNewPassword(omit(data, ['confirmPassword'])).unwrap()

      setShowSuccessDialog(true)
    } catch (error) {
      console.error('Failed to recover password:', error)
      if (isFormError(error)) {
        const field = error.data.messages[0].field
        const message = error.data.messages[0].message

        //todo get rid of type assertion
        setError(field as FieldName<NewPasswordFormData>, { message, type: 'manual' })
      } else {
        setShowErrorDialog(true)
      }
    }
  })

  const handleCloseSuccessDialog = async () => {
    setShowSuccessDialog(false)
    await router.push('/login')
  }

  const submitDisabled = isLoading || !isValid || !isDirty

  return (
    <div className={s.wrapper}>
      <dialog
        className={clsx(showSuccessDialog && s.dialog)}
        open={showSuccessDialog}
        role={'alertdialog'}
      >
        <Typography variant={'h1'}>{t.forgotPassword.newPassword.successDialogTitle}</Typography>
        <Typography variant={'regular16'}>
          {t.forgotPassword.newPassword.successDialogText}
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
        <Typography variant={'h1'}>{t.forgotPassword.newPassword.errorDialogTitle}</Typography>
        <Typography variant={'regular16'}>
          {t.forgotPassword.newPassword.errorDialogText}
        </Typography>
        <div className={s.flexFiller} />
        <div className={s.buttonContainer}>
          <Button onClick={() => setShowErrorDialog(false)} variant={'primary'}>
            OK
          </Button>
        </div>
      </dialog>
      <Card className={s.card} variant={'dark500'}>
        <Typography className={s.title} textAlign={'center'} variant={'h1'}>
          {t.forgotPassword.newPassword.title}
        </Typography>
        <form className={s.form} onSubmit={sendRequest}>
          <DevTool control={control} />
          <div className={s.wrap}>
            <FormInput
              control={control}
              error={errors.newPassword?.message}
              label={t.signUp.passTitle}
              name={'newPassword'}
              type={'password'}
            />
            <FormInput
              control={control}
              error={errors.confirmPassword?.message}
              label={t.signUp.confirmPass}
              name={'confirmPassword'}
              type={'password'}
            />
            <Typography className={s.hint} textAlign={'start'} variant={'regular14'}>
              {t.forgotPassword.newPassword.hint}
            </Typography>
            <Button className={s.submitButton} disabled={submitDisabled} type={'submit'}>
              {!isLoading && t.forgotPassword.newPassword.createNewPassword}
              {isLoading && 'loading...'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
