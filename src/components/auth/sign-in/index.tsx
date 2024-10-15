import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { SocialAuthButtons } from '@/components/auth'
import { FormInput } from '@/components/controll/formTextField'
import { Toast } from '@/components/layouts/Toast'
import { useTranslation } from '@/hooks/useTranslation'
import { useSignInMutation } from '@/services'
import { isErrorResponse, isFormError } from '@/services/incta-team-api/common/types'
import { decodeJWT } from '@/utils/decode-jwt'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'
import { toast } from 'sonner'

import s from './logIn.module.scss'

import { SignInFormData, logInSchema } from './logIn-schema'

export function SignInForm() {
  const [login, { error }] = useSignInMutation()
  //error state from the hook is somewhat always behind the current render so
  // it could be used instead of catch but useEffect is probably would be needed
  //and to get {field: errorMessage}[] structure transformErrorResponse in api slice
  //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-query-responses-with-transformerrorresponse

  //todo implement
  // const googleLoginAndRegister = () => {}?? сыпится ошибка из-а этого, пока так

  const { t } = useTranslation()

  const zodSignUpSchema = useMemo(() => logInSchema(t), [t])

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, isValidating },
    handleSubmit,
    setError,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(zodSignUpSchema),
  })

  const { executeRecaptcha, loaded: recaptchaLoaded } = useReCaptcha()

  const router = useRouter()

  const onSubmit = async (data: SignInFormData) => {
    try {
      const recaptcha = await executeRecaptcha('submit')

      if (!recaptcha) {
        toast.custom(toast => <Toast text={t.common.recaptchaCheckFailed} variant={'error'} />, {
          duration: 5000,
        })

        return
      }

      const token = await login({ ...data, captchaToken: recaptcha }).unwrap()
      const userId = token?.accessToken ? decodeJWT(token?.accessToken).userId : ''

      userId && (await router.push(`/profile/${userId}`))
    } catch (error) {
      if (isErrorResponse(error)) {
        if (error.data.errorName === 'UnauthorizedException') {
          setError('password', { message: t.signIn.wrongCredentials })
        }
        if (error.data.errorName !== 'UnauthorizedException' && error.status !== 403) {
          toast.custom(toast => <Toast text={error.data.errorName} variant={'error'} />, {
            duration: 5000,
          })
        }
        if (error.status === 403) {
          toast.custom(toast => <Toast text={t.common.recaptchaCheckFailed} variant={'error'} />, {
            duration: 5000,
          })
        }
      }
      //the api sends extraneous info about credentials
      //the sign-in process usually won't show password quality checks to a user
      if (isFormError(error)) {
        setError('password', { message: t.signIn.wrongCredentials })
        // toast.custom(
        //   toast => (
        //     <Toast
        //       // title={error.data.errorsMessages.map(message => message.message).join('|')}
        //       title={t.signIn.wrongCredentials}
        //       variant={'error'}
        //     />
        //   ),
        //   {
        //     duration: 5000,
        //   }
        // )
      }

      if (!isErrorResponse(error) && !isFormError(error)) {
        toast.custom(toast => <Toast text={JSON.stringify(error)} variant={'error'} />, {
          duration: 5000,
        })
      }
    }
  }

  const submitDisabled = !isDirty || !isValid || isValidating || isSubmitting

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card} variant={'dark500'}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.signIn.title}
        </Typography>
        <SocialAuthButtons />
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
    </>
  )
}
