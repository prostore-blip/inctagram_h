import { PageWrapper, SingUp } from '@/components'
import { useSingUpMutation } from '@/services'
import { useReCaptcha } from 'next-recaptcha-v3'
import { useRouter } from 'next/router'
import { useState } from 'react'

export function SignUp() {
  const [singUp, { data, isLoading }] = useSingUpMutation()
  const { executeRecaptcha, loaded: recaptchaReady  } = useReCaptcha()
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaLoading, setRecaptchaLoading] = useState<boolean>(false)
  const router = useRouter()

  const getRecaptchaToken = async () => {
    if (!recaptchaReady) {
      return
    }

    try {
      setRecaptchaLoading(true)
      const token = await executeRecaptcha('submit')
      setRecaptchaToken(token)
    } catch (err) {
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
      recaptcha: recaptchaToken
    }

    console.log(dataWithRecaptcha)
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
