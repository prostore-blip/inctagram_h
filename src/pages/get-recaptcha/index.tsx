import { FormEvent, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RecaptchaBox } from '@/components'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { Button, Card } from '@chrizzo/ui-kit'
import { useReCaptcha } from 'next-recaptcha-v3'

import s from '@/components/auth/forgotPassword/forgotPasswordForm.module.scss'

function GetRecaptcha() {
  const { executeRecaptcha, loaded: recaptchaReady } = useReCaptcha()
  const [recaptchaTokenLoading, setRecaptchaTokenLoading] = useState(false)

  const { control, getValues, handleSubmit, register, setValue, trigger } = useForm({
    defaultValues: {
      recaptcha: '',
    },
    mode: 'onTouched',
  })

  const getRecaptchaToken = async () => {
    if (!recaptchaReady) {
      return
    }
    try {
      setRecaptchaTokenLoading(true)
      const token = await executeRecaptcha('submit')

      setValue('recaptcha', token)
      await trigger('recaptcha')
    } catch (err) {
      setValue('recaptcha', '')
    } finally {
      setRecaptchaTokenLoading(false)
    }
  }

  const makeRequest = handleSubmit(async data => {})

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await makeRequest()
  }

  return (
    <>
      <Card variant={'dark500'}>
        <form className={s.form} onSubmit={onSubmit}>
          <div style={{ width: '100%' }}>
            <textarea
              {...register('recaptcha')}
              style={{ backgroundColor: 'var(--color-bg)', height: '300px', width: '100%' }}
            />
            <Button>Не делает ничего</Button>
          </div>
        </form>

        {/*todo discuss necessity - the checkbox was somewhat necessary for v2 but not for v3*/}
        <RecaptchaBox
          checked={Boolean(getValues('recaptcha'))}
          isLoading={recaptchaTokenLoading}
          isReady={recaptchaReady}
          onClick={getRecaptchaToken}
        />
      </Card>
    </>
  )
}

GetRecaptcha.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default GetRecaptcha
