import { Button, Card, Typography } from '@chrizzo/ui-kit'
import s from './singUp.module.scss'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormCheckbox } from '@/components/controll/formCheckbox'
import { DevTool } from '@hookform/devtools'
import { FormInput } from '@/components/controll/formTextField'
import { omit } from 'remeda'
import { SocialAuthButtons } from '../../socialAuthButtons'

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
    handleSubmit,

    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: zodResolver(signUpSchema) })
  console.log('errors: ', errors)

  const onHandleSubmit = handleSubmit(data => {
    props.onSubmit(omit(data, ['confirmPassword']))
  })

  return (
    <Card className={s.card} variant="dark500">
      <Typography className={s.title} variant={'h1'} textAlign={'center'}>
        Sign Up
      </Typography>
      <SocialAuthButtons googleLoginAndRegister={() => {}} />
      <form onSubmit={onHandleSubmit}>
        <DevTool control={control} />
        <div className={s.wrap}>
          <FormInput
            className={s.Form}
            control={control}
            error={errors.email?.message}
            label={'Username'}
            name={'username'}
            placeholder={'username'}
          />
          <FormInput
            className={s.Form}
            control={control}
            error={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
          />
          <FormInput
            className={s.Form}
            control={control}
            error={errors.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          <FormInput
            control={control}
            error={errors.confirmPassword?.message}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
          <FormCheckbox
            label={
              <Typography className={s.checkboxwrapper} variant={'small'}>
                I agree to the <Typography variant={'smallLink'}>Terms of Service</Typography> and{' '}
                <Typography variant={'smallLink'}>Privacy Policy</Typography>
              </Typography>
            }
            control={control}
            name={'rememberMe'}
          />
          <Button className={s.SingUpButton} type="submit">
            SingUp
          </Button>
        </div>
        <Typography className={s.title} variant={'regular16'}>
          Do you have an account?
        </Typography>
        <Button variant={'outline'} className={s.SingInButton}>
          SingIn
        </Button>
      </form>
    </Card>
  )
}
const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
