import { ReactNode } from 'react'

import { ForgotPasswordForm, ResetPasswordForm } from '@/components/auth'
import { AuthLayout } from '@/components/layouts/AuthLayout'

function ResetPasswordFormPage() {
  return <ResetPasswordForm />
}

ResetPasswordFormPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default ResetPasswordFormPage
