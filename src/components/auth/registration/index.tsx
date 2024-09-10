import { useForm } from 'react-hook-form'

import { SocialAuthButtons } from '@/components/auth'
import { FormCheckbox } from '@/components/controll/formCheckbox'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { omit } from 'remeda'
import { z } from 'zod'

import s from './singUp.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3, 'Password has to be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(3, 'Password has to be at least 3 characters long'),
    rememberMe: z.boolean().default(false),
    username: z.string().min(3, 'Username has to be at least 3 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormType = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: Omit<SignUpFormType, 'confirmPassword'>) => void
}

export const SingUp = (props: Props) => {
  const {
    control,
    formState: { errors },

    handleSubmit,
  } = useForm<SignUpFormType>({ resolver: zodResolver(signUpSchema) })

  const onHandleSubmit = handleSubmit(data => {
    props.onSubmit(omit(data, ['confirmPassword']))
  })

  const { t } = useTranslation()

  return (
    <div className={s.wrapper}>
      <Card className={s.card} variant={'dark500'}>
        <Typography as={'h1'} className={s.title} textAlign={'center'} variant={'h1'}>
          {t.signUp.title}
        </Typography>
        <SocialAuthButtons googleLoginAndRegister={() => {}} />
        <form onSubmit={onHandleSubmit}>
          <DevTool control={control} />
          <div className={s.wrap}>
            <FormInput
              className={s.Form}
              control={control}
              error={errors.email?.message}
              label={t.signUp.userName}
              name={'username'}
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
              name={'rememberMe'}
            />
            <Button className={s.SingUpButton} type={'submit'}>
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
const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
