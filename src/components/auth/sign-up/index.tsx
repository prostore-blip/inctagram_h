import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SocialAuthButtons } from '@/components/auth'
import { AuthModal } from '@/components/auth/sign-up/authModal'
import { FormCheckbox } from '@/components/controll/formCheckbox'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useSignUpMutation } from '@/services'
import { ErrorResponse } from '@/services/incta-team-api/auth/instagram.auth.type'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './singUp.module.scss'

import { SignupFormFields, signUpSchema } from './schema'

export const SingUpComponent = () => {
  const [signUp, { isError, isLoading }] = useSignUpMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { executeRecaptcha, loaded: recaptchaReady } = useReCaptcha()

  const { t } = useTranslation()

  // Генерация схемы для валидации формы с мемоизацией
  const zodSignUpSchema = useMemo(() => signUpSchema(t), [t])

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid, isValidating },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<SignupFormFields>({
    defaultValues: {
      acceptTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(zodSignUpSchema),
  })

  // Сброс формы и состояния
  const onCloseModal = () => {
    setIsModalOpen(false)
    reset({ acceptTerms: false, confirmPassword: '', email: '', password: '', userName: '' })
  }

  // Обработка ошибок
  const handleError = (err: ErrorResponse) => {
    const errorMessage = err?.data?.errorsMessages?.[0]?.message

    if (errorMessage?.includes('userName')) {
      setError(
        'userName',
        { message: t.signUp.errors.userNameAlreadyConfirmed },
        { shouldFocus: true }
      )
    } else if (errorMessage?.includes('email')) {
      setError('email', { message: t.signUp.errors.emailAlreadyConfirmed }, { shouldFocus: true })
    } else {
      console.error('Неизвестная ошибка:', errorMessage)
    }
  }

  // Обработчик отправки формы
  const onFormSubmit = handleSubmit(async data => {
    if (!recaptchaReady) {
      console.log('reCAPTCHA еще не загружен')

      return
    }

    try {
      const captchaToken = await executeRecaptcha('submit')

      console.log('Получен captchaToken:', captchaToken)

      await signUp({
        captchaToken,
        email: data.email,
        password: data.password,
        userName: data.userName,
      }).unwrap()

      setIsModalOpen(true)
    } catch (err) {
      handleError(err as ErrorResponse)
    }
  })

  // Флаг для отключения кнопки отправки
  const submitDisabled = !isDirty || !isValid || isValidating || isSubmitting
  const busy = isSubmitting || isLoading

  return (
    <>
      <Card className={s.card} variant={'dark500'}>
        <Typography as={'h1'} className={s.title} textAlign={'center'} variant={'h1'}>
          {t.signUp.title}
        </Typography>
        <SocialAuthButtons googleLoginAndRegister={() => {}} />
        <form data-badge={'inline'} onSubmit={onFormSubmit}>
          <DevTool control={control} />
          <div className={s.wrap}>
            <FormInput
              className={s.Form}
              control={control}
              error={errors.email?.message}
              label={t.signUp.userName}
              name={'userName'}
              placeholder={'username'}
            />
            <FormInput
              className={s.Form}
              control={control}
              error={errors.email?.message}
              label={t.signUp.emailTitle}
              name={'email'}
              placeholder={'Email'}
            />
            <FormInput
              className={s.Form}
              control={control}
              error={errors.password?.message}
              label={t.signUp.passTitle}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <FormInput
              control={control}
              error={errors.confirmPassword?.message}
              label={t.signUp.confirmPass}
              name={'confirmPassword'}
              placeholder={'Confirm Password'}
              type={'password'}
            />
            <FormCheckbox
              control={control}
              label={
                <Typography className={s.checkboxwrapper} variant={'small'}>
                  I agree to the{' '}
                  <Typography as={Link} href={'/termsOfService'} variant={'smallLink'}>
                    Terms of Service
                  </Typography>{' '}
                  and{' '}
                  <Typography as={Link} href={'/privacyPolicy'} variant={'smallLink'}>
                    Privacy Policy
                  </Typography>
                </Typography>
              }
              name={'acceptTerms'}
            />
            <Button className={s.SingUpButton} disabled={submitDisabled} type={'submit'}>
              {!busy ? t.signUp.signUp : 'Loading...'}
            </Button>
          </div>
        </form>
        <Typography className={s.title} textAlign={'center'} variant={'regular16'}>
          {t.signUp.haveAcc}
        </Typography>
        <Button as={Link} className={s.SingInButton} href={'/login'} variant={'text'}>
          {t.signUp.signInButton}
        </Button>
        {/* Общие ошибки, не связанные с полями */}
        {errors.root?.message && <div className={s.errorDiv}>{errors.root.message}</div>}
      </Card>
      {/* Модальное окно подтверждения */}
      <AuthModal
        description={t.signUp.emailSentText(getValues('email'))}
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={t.signUp.emailSent}
      />
    </>
  )
}

SingUpComponent.displayName = 'SingUpComponent'
