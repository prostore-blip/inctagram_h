import { MailVerificationError, MailVerificationSuccess } from '@/components'
import { LogIn } from '@/components/auth/sign-in'
import { RECAPTCHA_KEY } from '@/const'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function SignIn() {
  const router = useRouter()
  const { 'email-verification-failed': emailError, 'email-verification-success': emailSuccess } =
    router.query

  return (
    <>
      <ReCaptchaProvider language={router.locale} reCaptchaKey={RECAPTCHA_KEY}>
        {emailSuccess && <MailVerificationSuccess />}
        {emailError && <MailVerificationError email={''} />}
        {!emailSuccess && !emailError && <LogIn />}
      </ReCaptchaProvider>
    </>
  )
}

export default SignIn

//todo dig about hiding recaptcha widget
//https://developers.google.com/recaptcha/docs/faq?hl=ru#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
