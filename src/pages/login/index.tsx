import { GetLayout, LogIn, MailVerificationError, MailVerificationSuccess } from '@/components'
import { useRouter } from 'next/router'

export function SignIn() {
  const router = useRouter()
  const { 'email-verification-failed': emailError, 'email-verification-success': emailSuccess } =
    router.query

  return (
    <>
      {emailSuccess && <MailVerificationSuccess />}
      {emailError && <MailVerificationError email={''} />}
      {!emailSuccess && !emailError && <LogIn />}
    </>
  )
}

// SignIn.getLayout = GetLayout
export default SignIn
