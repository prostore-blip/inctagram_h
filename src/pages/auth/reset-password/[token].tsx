import { ReactNode } from 'react'

import { RecoveryCodeError, ResetPasswordForm } from '@/components/auth'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { useTranslation } from '@/hooks/useTranslation'

export function Page() {
  const { router, t } = useTranslation()

  const token = typeof router?.query?.token === 'string' ? router.query.token : ''

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {token && token !== 'invalid-token' && <ResetPasswordForm />}
      {token === 'invalid-token' && (
        <RecoveryCodeError
          text={t.forgotPassword.expiredLink.expiredErrorHint}
          title={t.forgotPassword.expiredLink.expiredErrorTitle}
        />
      )}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
