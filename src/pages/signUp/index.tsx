import { PageWrapper } from '@/components'
import { SingUp } from '@/components/auth/sign-up'
import { RECAPTCHA_KEY } from '@/const'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function SignUp() {
  return (
    <PageWrapper>
      <SingUp />
    </PageWrapper>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
