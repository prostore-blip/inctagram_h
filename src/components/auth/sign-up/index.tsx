import { FieldPath, useForm } from 'react-hook-form'

import { SocialAuthButtons } from '@/components/auth'
import { SignInFormData } from '@/components/auth/sign-in/logIn-schema'
import { FormCheckbox } from '@/components/controll/formCheckbox'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useSingUpMutation } from '@/services'
import { isFormDataErrorResponse } from '@/services/incta-team-api/common/types'
import { isFetchBaseQueryError } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './singUp.module.scss'

import { SignUpFormData, signUpSchema } from './schema'

type Props = {
  onSubmit?: (data: Omit<SignUpFormData, 'confirmPassword' | 'rememberMe'>) => void
}

export const SingUp = (props: Props) => {
  const [singUp, { data, isLoading }] = useSingUpMutation()

  const { executeRecaptcha, loaded: recaptchaLoaded } = useReCaptcha()

  const { t } = useTranslation()

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid, isValidating },
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<SignUpFormData>({
    defaultValues: {
      acceptPolicies: false,
      captchaToken: 'placeholder-to-not-disable-form',
      confirmPassword: 'Ex4mple!!!',
      email: 'voyager5874@gmail.com',
      password: 'Ex4mple!!!',
      userName: 'tester11',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const recaptcha = await executeRecaptcha('submit')

      if (!recaptcha) {
        throw new Error('no recaptcha')
      }
      setValue('captchaToken', recaptcha)
      await trigger('captchaToken')

      await singUp(data).unwrap()

      //todo show toast?
      //todo middleware for redirecting?
    } catch (error) {
      if (isFetchBaseQueryError(error) && isFormDataErrorResponse(error.data)) {
        error.data.errorsMessages.forEach(field => {
          setError(field.field as FieldPath<SignInFormData>, { message: field.message })
        })
      } else {
        //todo show toast?
        console.warn(error)
      }
    }
  }
  const submitDisabled = !isDirty || !isValid || isValidating || isSubmitting

  return (
    <div className={s.wrapper}>
      <Card className={s.card} variant={'dark500'}>
        <Typography className={s.title} textAlign={'center'} variant={'h1'}>
          {t.signUp.title}
        </Typography>
        <SocialAuthButtons googleLoginAndRegister={() => {}} />
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <FormInput
              className={s.hidden}
              control={control}
              error={errors.captchaToken?.message}
              hidden
              label={'Captcha'}
              name={'captchaToken'}
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
              name={'acceptPolicies'}
            />
            <Button className={s.SingUpButton} disabled={submitDisabled} type={'submit'}>
              {t.signUp.signUp}
            </Button>
          </div>
        </form>
        <Typography className={s.title} textAlign={'center'} variant={'regular16'}>
          {t.signUp.haveAcc}
        </Typography>
        <Button as={Link} className={s.SingInButton} href={'/login'} variant={'text'}>
          {t.signUp.signInButton}
        </Button>
      </Card>
    </div>
  )
}
