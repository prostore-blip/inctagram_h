import { useForm } from 'react-hook-form'

import { SocialAuthButtons } from '@/components/auth'
import { FormCheckbox } from '@/components/controll/formCheckbox'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useSignUpMutation } from '@/services'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'
import { omit } from 'remeda'

import s from './singUp.module.scss'

import { SignUpFormType, signUpSchema } from './schema'

export const SingUpComponent = () => {
  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid, isValidating },
    handleSubmit,
  } = useForm<SignUpFormType>({ resolver: zodResolver(signUpSchema) })

  const [singUp, { data, isError, isLoading }] = useSignUpMutation()
  const { executeRecaptcha, loaded: recaptchaReady } = useReCaptcha()
  const router = useRouter()

  const onFormSubmit = handleSubmit(async data => {
    if (!recaptchaReady) {
      return
    }
    const filteredData = omit(data, ['confirmPassword', 'acceptTerms'])

    try {
      const captchaToken = await executeRecaptcha('submit')

      //todo show toast
      if (!captchaToken) {
        return
      }

      const formDataWithToken = {
        ...filteredData,
        captchaToken,
      }

      const response = await singUp(formDataWithToken)

      //todo show toast
      if (response?.error) {
        return
      }

      // await router.push('/login')
    } catch (error) {
      //todo show toast
      alert('An error occurred. Please try again later.')
    }
  })

  const { t } = useTranslation()

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
              {!busy && t.signUp.signUp}
              {busy && 'Loading...'}
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
    </>
  )
}
