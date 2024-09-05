import { GetLayout, LogIn, MailVerificationError, MailVerificationSuccess } from '@/components'
import { useRouter } from 'next/router'
import { Statistics } from '../statistics'

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
