import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { RecaptchaLogo } from '@/assets/image/recaptchaLogo'
import { FormInput } from '@/components/controll/formTextField'
import { EMAIL_KEY_FOR_PASSWORD_RESET } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { useForgotPasswordMutation } from '@/services/inctagram.auth.service'
import { isUnsuccessfulRequestResult } from '@/types'
import { Button, Card, Checkbox, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './forgotPassword.module.scss'

import { ForgotPasswordRequestData, forgotPasswordFormSchema } from './schema'

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isLoading, isSuccess }] = useForgotPasswordMutation()
  //there is no field in RTKQ or useForm hooks which is not changing after a new request
  const [emailSent, setEmailSent] = useState(false)

  const { t } = useTranslation()

  const { executeRecaptcha, grecaptcha, loaded: recaptchaReady, reCaptchaKey } = useReCaptcha()
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
    if (!grecaptcha || !reCaptchaKey) {
      return
    }
    try {
      setRecaptchaTokenLoading(true)
      const token = await executeRecaptcha('submit')

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
      if (isSuccess) {
        //without checkbox
        await getRecaptchaToken()
      }
      //data contains old token here
      //todo refactor the flow related to recaptcha - data should contain a fresh recaptcha token
      await forgotPassword({ ...data, recaptcha: getValues('recaptcha') }).unwrap()

      setShowSuccessDialog(true)
      setEmailSent(true)
      //there is no email data in the link
      //todo decide: store or localStorage, or maybe the link in the end
      localStorage.setItem(EMAIL_KEY_FOR_PASSWORD_RESET, data.email)
    } catch (error) {
      if (isUnsuccessfulRequestResult(error) && error.data.statusCode === 404) {
        const message = t.forgotPassword.startPage.emailNotFound

        setError('email', { message, type: 'manual' })
      } else {
        setShowErrorDialog(true)
      }
    }
  })

  const submitDisabled = !isDirty || !isValid || isLoading || isValidating || isSubmitting

  //todo replace native dialog with component
  //todo translation with dynamic values
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
          {` ${getValues('email') || 'undefined@undefined'}`}
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
          <Button onClick={handleCloseErrorDialog} variant={'primary'}>
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
            {emailSent && (
              <Typography textAlign={'start'} variant={'regular14'}>
                {t.forgotPassword.startPage.linkSent}
              </Typography>
            )}
            <Button className={s.submitButton} disabled={submitDisabled} type={'submit'}>
              {emailSent && t.forgotPassword.startPage.sendLinkAgain}
              {!emailSent && t.forgotPassword.startPage.sendLink}
              {isSubmitting && <span className={clsx(s.loader)} />}
            </Button>
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
    </div>
  )
}

type Props = {
  checked: boolean
  hidden?: boolean
  isLoading: boolean
  isReady?: boolean
  onClick: () => void
}

function RecaptchaBox({ checked, hidden, isLoading, isReady, onClick }: Props) {
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
