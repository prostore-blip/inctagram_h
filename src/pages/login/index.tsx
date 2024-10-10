import { ReactNode } from 'react'

import { MailVerificationError, MailVerificationSuccess, SignInForm } from '@/components'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { useRouter } from 'next/router'

function SignInPage() {
  const router = useRouter()
  const { 'email-verification-failed': emailError, 'email-verification-success': emailSuccess } =
    router.query

  return (
    <>
      {emailSuccess && <MailVerificationSuccess />}
      {emailError && <MailVerificationError />}
      {!emailSuccess && !emailError && <SignInForm />}
    </>
  )
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignInPage
