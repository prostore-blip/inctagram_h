import { PageWrapper, SingUpComponent } from '@/components'
import { RECAPTCHA_KEY } from '@/const'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function SignUp() {
  const { router } = useTranslation()

  return (
    <ReCaptchaProvider
      language={router.locale}
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
    >
      <PageWrapper>
        <SingUpComponent />
      </PageWrapper>
    </ReCaptchaProvider>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
