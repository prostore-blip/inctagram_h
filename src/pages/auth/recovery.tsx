import { useEffect } from 'react'

import { GetLayout, PageWrapper } from '@/components'
import { NewPasswordForm, RecoveryCodeError } from '@/components/auth'
import { useTranslation } from '@/hooks/useTranslation'
import { useCheckRecoveryCodeMutation } from '@/services/inctagram.auth.service'
import { isFormError } from '@/types'

export function Page() {
  const [checkCode, { error, isError, isLoading, isSuccess }] = useCheckRecoveryCodeMutation()

  const { router, t } = useTranslation()

  useEffect(() => {
    const recoveryCode = typeof router.query?.code === 'string' ? router.query.code : ''

    if (!recoveryCode) {
      //should we cancel or just get error message from the api?
      //return
    }
    checkCode({ recoveryCode })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const recoveryCodeExpired =
    isFormError(error) &&
    error.data.messages[0].message.includes('valid') &&
    error.data.messages[0].field === 'code'

  if (isLoading) {
    return <PageWrapper>Loading...</PageWrapper>
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isSuccess && <NewPasswordForm />}
        {isError && (
          <RecoveryCodeError
            text={
              recoveryCodeExpired
                ? t.forgotPassword.expiredLink.expiredErrorHint
                : t.forgotPassword.expiredLink.unknownErrorHint
            }
            title={
              recoveryCodeExpired
                ? t.forgotPassword.expiredLink.expiredErrorTitle
                : t.forgotPassword.expiredLink.unknownErrorTitle
            }
          />
        )}
      </div>
    </PageWrapper>
  )
}

Page.getLayout = GetLayout
export default Page
