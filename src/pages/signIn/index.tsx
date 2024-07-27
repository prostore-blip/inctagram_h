import { useForm } from 'react-hook-form'

import { GetLayout, PageWrapper, SocialAuthButtons } from '@/components'
import { FormInput } from '@/components/controll/formTextField'
import { signInSchema } from '@/pages/signIn/signIn-schema'
import { FormValues } from '@/pages/signIn/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './signIn.module.scss'

export function SignIn() {
  const googleLoginAndRegister = () => {}
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log('onSubmit')
  }

  return (
    <PageWrapper>
      <div className={s.wrapper}>
        <Card className={s.card}>
          <Typography variant={'h1'}>SignIn</Typography>
          <SocialAuthButtons googleLoginAndRegister={googleLoginAndRegister} />
          <form onSubmit={handleSubmit(onSubmit)}>
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
          </form>
          <Link href={'/forgotPassword'}>
            <Typography className={s.forgot} variant={'regular14'}>
              Forgot Password
            </Typography>
          </Link>
          <Button>
            <Typography variant={'h3'}>Sign In</Typography>
          </Button>
          <span>Don&apos;t have an account?</span>
          <Button as={'a'} href={'/signUp'} variant={'text'}>
            <Typography variant={'h3'}>Sign In</Typography>
          </Button>
        </Card>
      </div>
    </PageWrapper>
  )
}

SignIn.getLayout = GetLayout
export default SignIn
