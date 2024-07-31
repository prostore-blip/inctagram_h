import { useForm } from 'react-hook-form'

import { PageWrapper, SocialAuthButtons } from '@/components'
import { logInSchema } from '@/components/auth/logIn/logIn-schema'
import { FormValues } from '@/components/auth/logIn/types'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { useLoginMutation } from '@/services/inctagram.auth.service'
import { ErrorData } from '@/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './logIn.module.scss'

export function LogIn() {
  const googleLoginAndRegister = () => {}
  /**
   * Переменные для обработки форм из react-hook-form
   */
  const {
    control,
    formState: {},
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    mode: 'onTouched',
    resolver: zodResolver(logInSchema),
  })
  /**
   * хук RTKQ логинизации
   */
  const [login, { error }] = useLoginMutation()
  /**
   * кастомный хук интенационализации
   */
  const { t } = useTranslation()
  /**
   * хук обработки URL
   */
  const router = useRouter()
  /**
   * Обработчик формы
   * @param data - данные из формы
   */
  const onSubmit = (data: FormValues) => {
    login(data)
      .unwrap()
      .then(() => {
        void router.push(`/home`)
      })
      .catch(() => {
        void router.push('/signUp')
      })
  }

  /**
   * определение типа ошибки из RTKQ: если есть свойство status в объекте error, то тип error - FetchBaseQueryError,
   * иначе тип - SerializedError. Дополнительно протипизировал объект data, иначе при обращении к свойству data.message
   * появляется ошибка. Ошибку set'аем в поле password
   */

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
