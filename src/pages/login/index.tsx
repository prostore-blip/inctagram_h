import { ReactNode } from 'react'

import { MailVerificationError, MailVerificationSuccess } from '@/components'
import { SignInForm } from '@/components/auth/sign-in'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { useRouter } from 'next/router'

export function SignInPage() {
  const router = useRouter()
  const { 'email-verification-failed': emailError, 'email-verification-success': emailSuccess } =
    router.query

  return (
    <>
      {emailSuccess && <MailVerificationSuccess />}
      {emailError && <MailVerificationError email={''} />}
      {!emailSuccess && !emailError && <SignInForm />}
    </>
  )
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignInPage
