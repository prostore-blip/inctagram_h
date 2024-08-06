import { GetLayout, PageWrapper } from '@/components'
import { ForgotPasswordForm } from '@/components/auth/forgotPassword'

export function ForgotPassword() {
  return (
    <PageWrapper>
      <ForgotPasswordForm />
    </PageWrapper>
  )
}
ForgotPassword.getLayout = GetLayout
export default ForgotPassword
