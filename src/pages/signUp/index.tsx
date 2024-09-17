import { PageWrapper } from '@/components'
import { SingUp } from '@/components/auth/sign-up'
import { RECAPTCHA_KEY } from '@/const'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function SignUp() {
  // const [singUp, { data, isLoading }] = useSingUpMutation()

  const router = useRouter()

  // const register = async (formData: any) => {
  //   try {
  //     const response = await singUp(formData)
  //
  //     router.push('/profile')
  //     console.log('Response from server:', response)
  //   } catch (error) {
  //     console.error('Error during registration:', error)
  //   }
  // }

  return (
    <ReCaptchaProvider language={router.locale} reCaptchaKey={RECAPTCHA_KEY}>
      <PageWrapper>
        <SingUp />
      </PageWrapper>
    </ReCaptchaProvider>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
