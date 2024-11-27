import { Modal } from '@/components/auth/sign-up/modal'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'

import s from './authModal.module.scss'

type Props = {
  description: string
  isOpen: boolean
  onClose: () => void
  title: string
}

export const AuthModal = ({ description, isOpen, onClose, title }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal className={s.modal} onOpenChange={onClose} open={isOpen} title={title}>
      <div className={s.modalContent}>
        <Typography>{description}</Typography>
        <Button className={s.modalButton} onClick={onClose} variant={'primary'}>
          {t.buzzWords.ok}
        </Button>
      </div>
    </Modal>
  )
}
