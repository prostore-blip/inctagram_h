import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { useConfirmEmailRegistrationMutation } from '@/services'
import { Button } from '@chrizzo/ui-kit'

const ConfirmEmailPage = () => {
  const { router, t } = useTranslation()
  const confirmationCode = typeof router?.query?.code === 'string' ? router.query.code : ''
  const [confirm, { isLoading }] = useConfirmEmailRegistrationMutation()

  const handleConfirm = () => {
    if (!confirmationCode) {
      return
    }
    confirm({ confirmationCode })
  }

  return (
    <div>
      <div>{confirmationCode}</div>
      <Button onClick={handleConfirm}>Confirm</Button>
    </div>
  )
}

ConfirmEmailPage.getLayout = function getLayout(page: ReactNode) {
  //the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default ConfirmEmailPage
