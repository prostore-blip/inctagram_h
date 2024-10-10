import { ReactNode } from 'react'

import { ForgotPasswordForm } from '@/components/auth'
import { AuthLayout } from '@/components/layouts/AuthLayout'

function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPasswordPage
