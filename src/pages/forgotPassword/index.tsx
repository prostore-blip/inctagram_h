import { GetLayout, PageWrapper } from '@/components'
import { ForgotPasswordForm } from '@/components/auth'
import { useTranslation } from '@/hooks/useTranslation'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function ForgotPassword() {
  const { router } = useTranslation()

  return (
    <ReCaptchaProvider
      language={router.locale}
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
    >
      <PageWrapper>
        <ForgotPasswordForm />
      </PageWrapper>
    </ReCaptchaProvider>
  )
}
ForgotPassword.getLayout = GetLayout
export default ForgotPassword
