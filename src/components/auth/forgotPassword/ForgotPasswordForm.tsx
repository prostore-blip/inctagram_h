import { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RecaptchaLogo } from '@/assets/image/recaptchaLogo'
import { FormInput } from '@/components/controll/formTextField'
import { EMAIL_KEY_FOR_PASSWORD_RESET } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { usePasswordRecoveryMutation } from '@/services'
import { isUnsuccessfulRequestResult } from '@/types'
import { Button, Card, Checkbox, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './forgotPasswordForm.module.scss'

import { AuthModalComponent } from '../authModal/AuthModalComponent'
import { ForgotPasswordRequestData, forgotPasswordFormSchema } from './schema'

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isLoading, isSuccess }] = usePasswordRecoveryMutation()
  //there is no field in RTKQ or useForm hooks which is not changing after a new request
  const [emailSent, setEmailSent] = useState(false)

  const { t } = useTranslation()

  const { executeRecaptcha, loaded: recaptchaReady } = useReCaptcha()
  const [recaptchaTokenLoading, setRecaptchaTokenLoading] = useState(false)

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const {
    control,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting, isValid, isValidating },
    getValues,
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<ForgotPasswordRequestData>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false)
  }

  const getRecaptchaToken = async () => {
    if (!recaptchaReady) {
      return
    }
    try {
      setRecaptchaTokenLoading(true)
      const token = await executeRecaptcha('submit')

      console.log('token', token)
      setValue('recaptcha', token)
      await trigger('recaptcha')
    } catch (err) {
      setValue('recaptcha', '')
    } finally {
      setRecaptchaTokenLoading(false)
    }
  }

  const makeRequest = handleSubmit(async data => {
    try {
      await forgotPassword(data).unwrap()
      setShowSuccessDialog(true)
      setEmailSent(true)
      //there is no email data in the link
      //todo decide: store or localStorage, or maybe the link in the end
      localStorage.setItem(EMAIL_KEY_FOR_PASSWORD_RESET, data.email)
    } catch (error) {
      if (isUnsuccessfulRequestResult(error) && error.data.statusCode === 404) {
        const message = t.forgotPassword.startPage.emailNotFound

        setError('email', { message, type: 'manual' })
        setValue('recaptcha', '')
        setRecaptchaTokenLoading(false)
      } else {
        console.log(1)
        setShowErrorDialog(true)
      }
    }
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isSuccess) {
      //'send again' frame doesn't have recaptcha checkbox
      await getRecaptchaToken()
    }
    await makeRequest()
  }
  const buttonText = emailSent
    ? t.forgotPassword.startPage.sendLinkAgain
    : t.forgotPassword.startPage.sendLink
  const submitDisabled = !isDirty || !isValid || isLoading || isValidating || isSubmitting

  //todo replace native dialog with component
  //todo translation with dynamic values
  return (
    <>
      <DevTool control={control} />
      <Card className={s.card} variant={'dark500'}>
        <Typography className={s.title} textAlign={'center'} variant={'h1'}>
          {t.forgotPassword.startPage.title}
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <div className={s.flexColumn}>
            <FormInput
              className={clsx(emailSent && s.noPointer)}
              control={control}
              error={errors.email?.message}
              label={t.signUp.emailTitle}
              name={'email'}
              placeholder={'example@example.com'}
              readOnly={emailSent}
            />
            <Typography className={s.hint} textAlign={'start'} variant={'regular14'}>
              {t.forgotPassword.startPage.hint}
            </Typography>
            {emailSent && (
              <Typography textAlign={'start'} variant={'regular14'}>
                {t.forgotPassword.startPage.linkSent}
              </Typography>
            )}
            <AuthModalComponent
              buttonText={buttonText}
              emailAddress={` ${getValues('email') || 'undefined@undefined'}`}
              errorDialogText={t.forgotPassword.startPage.errorDialogText}
              errorDialogTitle={t.forgotPassword.startPage.errorDialogTitle}
              handleCloseDialog={handleCloseSuccessDialog}
              handleCloseErrorDialog={handleCloseErrorDialog}
              isSubmitting={isSubmitting}
              showErrorDialog={showErrorDialog}
              showSuccessDialog={showSuccessDialog}
              submitDisabled={submitDisabled}
              successDialogText={t.forgotPassword.startPage.successDialogText}
              successDialogTitle={t.forgotPassword.startPage.successDialogTitle}
            ></AuthModalComponent>
          </div>
        </form>
        <Button as={Link} className={s.linkButton} href={'/login'} variant={'text'}>
          {t.forgotPassword.startPage.backToSignIn}
        </Button>
        {/*todo discuss necessity - the checkbox was somewhat necessary for v2 but not for v3*/}
        <RecaptchaBox
          checked={Boolean(getValues('recaptcha'))}
          hidden={emailSent}
          isLoading={recaptchaTokenLoading}
          isReady={recaptchaReady}
          onClick={getRecaptchaToken}
        />
      </Card>
    </>
  )
}

type Props = {
  checked: boolean
  hidden?: boolean
  isLoading: boolean
  isReady?: boolean
  onClick: () => void
}

export function RecaptchaBox({ checked, hidden, isLoading, isReady, onClick }: Props) {
  const handleRecaptchaClick = () => {
    onClick && onClick()
  }

  return (
    <div className={clsx(s.recaptchaBox, hidden && s.noDisplay)}>
      <div className={clsx(isLoading && s.noDisplay)}>
        <Checkbox
          checked={checked}
          disabled={checked || !isReady}
          label={<Typography variant={'small'}>I&apos;m not a robot</Typography>}
          onClick={handleRecaptchaClick}
        />
      </div>

      <div className={clsx(s.flexRow, !isLoading && s.noDisplay)}>
        <span className={clsx(s.loader)}></span>
        <Typography className={s.textNoWrap} variant={'small'}>
          I&apos;m not a robot
        </Typography>
      </div>
      <div>
        <RecaptchaLogo />
      </div>
    </div>
  )
}
