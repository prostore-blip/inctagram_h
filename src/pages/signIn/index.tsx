import { useForm } from 'react-hook-form'

import { GetLayout, PageWrapper, SocialAuthButtons } from '@/components'
import { FormInput } from '@/components/controll/formTextField'
import { signInSchema } from '@/pages/signIn/signIn-schema'
import { FormValues } from '@/pages/signIn/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './signIn.module.scss'
const errorFromRTKQ = 'The email or password are incorrect. Try again please'

export function SignIn() {
  const googleLoginAndRegister = () => {}
  const { control, handleSubmit, setError } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })
  const onSubmit = (data: FormValues) => {
    const { email, password } = data

    if (password.trim() && email.trim()) {
      // здесь логика отправки запрсоа на сервер с данными из формы
    } else {
      setError('password', { message: 'Поля не должны быть пустыми' })
    }
  }

  return (
    <PageWrapper>
      <div className={s.wrapper}>
        <Card className={s.card}>
          <Typography className={s.title} variant={'h1'}>
            SignIn
          </Typography>
          <SocialAuthButtons googleLoginAndRegister={googleLoginAndRegister} />
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Inctagram@gmail.com'}
            />
            <FormInput
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'******'}
              type={'password'}
            />
            <Typography className={s.forgot} variant={'regular14'}>
              <Link href={'/forgotPassword'}>Forgot Password</Link>
            </Typography>

            <Button fullWidth type={'submit'}>
              <Typography variant={'h3'}>Sign In</Typography>
            </Button>
          </form>
          <span className={s.dontHaveAccout}>Don&apos;t have an account?</span>
          <Button as={Link} href={'/signUp'} variant={'text'}>
            <Typography variant={'h3'}>Sign Up</Typography>
          </Button>
        </Card>
      </div>
    </PageWrapper>
  )
}

SignIn.getLayout = GetLayout
export default SignIn
