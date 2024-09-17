import { useTranslation } from '@/hooks/useTranslation'
import { useConfirmEmailRegistrationMutation } from '@/services'
import { Button } from '@chrizzo/ui-kit'

const ConfirmEmailPage = () => {
  const { router, t } = useTranslation()
  const code = typeof router?.query?.code === 'string' ? router.query.code : ''
  const [confirm, { isLoading }] = useConfirmEmailRegistrationMutation()

  const handleConfirm = () => {
    if (!code) {
      return
    }
    confirm({ code })
  }

  return (
    <div>
      <div>{code}</div>
      <Button onClick={handleConfirm}>Confirm</Button>
    </div>
  )
}

export default ConfirmEmailPage
