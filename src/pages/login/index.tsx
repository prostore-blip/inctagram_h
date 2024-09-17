import { GetLayout, MailVerificationError, MailVerificationSuccess } from '@/components'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { LogIn } from '@/components/auth/sign-in'

export function SignIn() {
  const router = useRouter()
  const { 'email-verification-failed': emailError, 'email-verification-success': emailSuccess } =
    router.query

  return (
    <>
      <ReCaptchaProvider
        language={router.locale}
        reCaptchaKey={'6LcXfikqAAAAAEtJf27WMmB70tR2xlm2A3Jlgz6P'}
      >
        {emailSuccess && <MailVerificationSuccess />}
        {emailError && <MailVerificationError email={''} />}
        {!emailSuccess && !emailError && <LogIn />}
      </ReCaptchaProvider>
    </>
  )
}

export default SignIn
