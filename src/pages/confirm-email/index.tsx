import { ReactNode, useEffect } from 'react'

import { ConfirmRegistration } from '@/components/auth/confirmRegistration/confirmRegistration'
import { LinkExpired } from '@/components/auth/linkExpired'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useConfirmEmailRegistrationMutation } from '@/services'
import { useRouter } from 'next/router'

const ConfirmEmailPage = () => {
  const router = useRouter()
  const confirmationCode = typeof router?.query?.code === 'string' ? router.query.code : ''
  const email = (router?.query?.email as string) ?? ''

  const [confirmEmailRegistration, { isError, isLoading }] = useConfirmEmailRegistrationMutation()

  useEffect(() => {
    if (confirmationCode) {
      confirmEmailRegistration({ confirmationCode })
    }
  }, [confirmationCode, confirmEmailRegistration])

  if (isLoading) {
    return <div>Loader...</div>
  }

  if (isError) {
    return <LinkExpired email={email} />
  }

  return <ConfirmRegistration />
}

ConfirmEmailPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default ConfirmEmailPage
