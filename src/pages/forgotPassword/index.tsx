import { GetLayout, PageWrapper } from '@/components'
import { ForgotPasswordForm } from '@/components/auth'
import { useTranslation } from '@/hooks/useTranslation'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function ForgotPassword() {
  const { router } = useTranslation()

  return (
    <ReCaptchaProvider
      language={router.locale}
      reCaptchaKey={'6LcXfikqAAAAAEtJf27WMmB70tR2xlm2A3Jlgz6P'}
    >
      <PageWrapper>
        <ForgotPasswordForm />
      </PageWrapper>
    </ReCaptchaProvider>
  )
}
ForgotPassword.getLayout = GetLayout
export default ForgotPassword
