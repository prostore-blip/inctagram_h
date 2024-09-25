import { FieldPath, useForm } from 'react-hook-form'

import { PageWrapper, SocialAuthButtons } from '@/components'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useSignInMutation } from '@/services'
import { isFormDataErrorResponse } from '@/services/incta-team-api/common/types'
import { isFetchBaseQueryError } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from './logIn.module.scss'

import { SignInFormData, logInSchema } from './logIn-schema'

export function LogIn() {
  const [login, { error }] = useSignInMutation()
  //error state from the hook is somewhat always behind the current render so
  // it could be used instead of catch but useEffect is probably would be needed
  //and to get {field: errorMessage}[] structure transformErrorResponse in api slice
  //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-query-responses-with-transformerrorresponse

  //todo implement
  const googleLoginAndRegister = () => {}

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, isValidating },
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<SignInFormData>({
    defaultValues: {
      captchaToken: 'placeholder-to-not-affect-submit-button',
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(logInSchema),
  })

  const { executeRecaptcha, loaded: recaptchaLoaded } = useReCaptcha()

  const { t } = useTranslation()

  const router = useRouter()

  const onSubmit = async (data: SignInFormData) => {
    try {
      const recaptcha = await executeRecaptcha('submit')

      if (!recaptcha) {
        throw new Error('no recaptcha')
      }
      //todo remove form field? or make separate functions as in forgotPassword form

      // setValue('captchaToken', recaptcha)
      // await trigger('captchaToken')
      //data already has placeholder token and won't be updated with setValue

      await login({ ...data, captchaToken: recaptcha }).unwrap()

      //todo show toast?
      //todo middleware for redirecting?
      void router.push(`/profile`)
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
    <PageWrapper>
      <div className={s.wrapper}>
        <DevTool control={control} />
        <Card className={s.card} variant={'dark500'}>
          <Typography className={s.title} variant={'h1'}>
            {t.signIn.title}
          </Typography>
          <SocialAuthButtons googleLoginAndRegister={googleLoginAndRegister} />
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              control={control}
              label={t.signIn.emailTitle}
              name={'email'}
              placeholder={'Inctagram@gmail.com'}
            />
            <FormInput
              control={control}
              label={t.signIn.passTitle}
              name={'password'}
              placeholder={'******'}
              type={'password'}
            />
            <FormInput
              className={s.hidden}
              control={control}
              hidden
              label={t.signIn.passTitle}
              name={'captchaToken'}
            />
            <Typography className={s.forgot} variant={'regular14'}>
              <Link href={'/forgotPassword'}>{t.signIn.forgotPass}</Link>
            </Typography>

            <Button disabled={submitDisabled} fullWidth type={'submit'}>
              <Typography variant={'h3'}>{t.signIn.signInButton}</Typography>
              {isSubmitting && <span className={clsx(s.loader)} />}
            </Button>
          </form>
          <span className={s.dontHaveAccout}>{t.signIn.dontHaveAcc}</span>
          <Button as={Link} href={'/signUp'} variant={'text'}>
            <Typography variant={'h3'}>{t.signIn.signUp}</Typography>
          </Button>
        </Card>
      </div>
    </PageWrapper>
  )
}
