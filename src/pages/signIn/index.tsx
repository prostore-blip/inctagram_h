import { useForm } from 'react-hook-form'

import { GetLayout, PageWrapper, SocialAuthButtons } from '@/components'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { signInSchema } from '@/pages/signIn/signIn-schema'
import { FormValues } from '@/pages/signIn/types'
import { ErrorData } from '@/pages/types'
import { useLoginMutation } from '@/services/inctagram.auth.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './signIn.module.scss'

export function SignIn() {
  const googleLoginAndRegister = () => {}

  const {
    control,
    formState: {},
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  })

  const [login, { error }] = useLoginMutation()

  const { t } = useTranslation()
  const router = useRouter()
  const onSubmit = (data: FormValues) => {
    login(data)
      .unwrap()
      .then(({ accessToken }) => {
        localStorage.setItem('token', accessToken)
        /* const { data } = await getProfile()
                if (!data) {return}*/
        void router.push(`/home`)
      })
      .catch(() => {
        void router.push('/signUp')
      })
  }

  //определение типа ошибки из RTKQ: если есть свойство status в объекте error, то тип error - FetchBaseQueryError, иначе тип - SerializedError. Дополнительно протипизировал объект data, иначе при обращении к свойству data.message появляется ошибка
  if (error) {
    if ('status' in error) {
      const errorDate = error.data as ErrorData

      setError('password', {
        message:
          typeof errorDate.messages === 'object'
            ? errorDate.messages[0].message
            : errorDate.messages,
      })
    } else {
      setError('password', { message: error.message })
    }
  }

  return (
    <PageWrapper>
      <div className={s.wrapper}>
        <Card className={s.card}>
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
            <Typography className={s.forgot} variant={'regular14'}>
              <Link href={'/forgotPassword'}>{t.signIn.forgotPass}</Link>
            </Typography>

            <Button fullWidth type={'submit'}>
              <Typography variant={'h3'}>{t.signIn.signInButton}</Typography>
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

SignIn.getLayout = GetLayout
export default SignIn
