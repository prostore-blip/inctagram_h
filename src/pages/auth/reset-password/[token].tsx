import { GetLayout, PageWrapper } from '@/components'
import { RecoveryCodeError, ResetPasswordForm } from '@/components/auth'
import { useTranslation } from '@/hooks/useTranslation'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export function Page() {
  const { router, t } = useTranslation()

  const token = typeof router?.query?.token === 'string' ? router.query.token : ''

  return (
    <ReCaptchaProvider
      language={router.locale}
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
    >
      <PageWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {token && token !== 'invalid-token' && <ResetPasswordForm />}
          {token === 'invalid-token' && (
            <RecoveryCodeError
              text={t.forgotPassword.expiredLink.expiredErrorHint}
              title={t.forgotPassword.expiredLink.expiredErrorTitle}
            />
          )}
        </div>
      </PageWrapper>
    </ReCaptchaProvider>
  )
}

Page.getLayout = GetLayout
export default Page
