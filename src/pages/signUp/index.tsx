import { useState } from 'react'

import { PageWrapper, SingUp } from '@/components'
import { useSingUpMutation } from '@/services'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

export function SignUp() {
  const [singUp, { data, isLoading }] = useSingUpMutation()
  const { executeRecaptcha, loaded: recaptchaReady } = useReCaptcha()
  const [recaptchaToken, setRecaptchaToken] = useState<null | string>(null)
  const [recaptchaLoading, setRecaptchaLoading] = useState<boolean>(false)
  const router = useRouter()

  const getRecaptchaToken = async () => {
    if (!recaptchaReady) {
      console.error('Recaptcha is not ready')

      return
    }

    try {
      setRecaptchaLoading(true)
      const token = await executeRecaptcha('submit')

      setRecaptchaToken(token)
    } catch (err) {
      console.error('Error getting recaptcha token:', err)
      setRecaptchaToken(null)
    } finally {
      setRecaptchaLoading(false)
    }
  }

  const register = async (formData: any) => {
    if (!recaptchaToken) {
      await getRecaptchaToken()
    }

    const dataWithRecaptcha = {
      ...formData,
      recaptcha: recaptchaToken,
    }

    singUp(dataWithRecaptcha)
  }

  if (isLoading || recaptchaLoading) {
    return <div>Loading</div>
  }

  if (data?.success) {
    router.push('/profile')
  }

  return (
    <PageWrapper>
      <SingUp onSubmit={register} />
    </PageWrapper>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
