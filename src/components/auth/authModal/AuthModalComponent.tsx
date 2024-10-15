import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './authModal.module.scss'

type ModalProps = {
  buttonText?: string
  emailAddress?: string
  emailSent?: string
  error?: any
  errorDialogText?: string
  errorDialogTitle?: string
  handleCloseDialog?: () => void
  handleCloseErrorDialog?: () => void
  isSubmitting?: boolean
  modalButtonText?: string
  showErrorDialog?: boolean
  showSuccessDialog?: boolean
  submitDisabled?: boolean
  successDialogText?: string
  successDialogTitle?: string
  useLinkOnSuccess?: boolean
}

export const AuthModalComponent = (props: ModalProps) => {
  const {
    buttonText,
    emailAddress,
    emailSent,
    error,
    errorDialogText,
    errorDialogTitle,
    handleCloseDialog,
    handleCloseErrorDialog,
    isSubmitting,
    modalButtonText = 'OK',
    showErrorDialog,
    showSuccessDialog,
    submitDisabled,
    successDialogText,
    successDialogTitle,
    useLinkOnSuccess,
  } = props

  const dialogClassName = clsx(showSuccessDialog || showErrorDialog ? s.dialog : '')

  return (
    <>
      <Modal open={showSuccessDialog || showErrorDialog}>
        <ModalTrigger asChild>
          <Button className={s.submitButton} disabled={submitDisabled} type={'submit'}>
            {buttonText}
            {isSubmitting && <span className={clsx(s.loader)} />}
          </Button>
        </ModalTrigger>
        <ModalContent className={dialogClassName}>
          {showSuccessDialog && (
            <>
              <ModalTitle>
                <div className={s.topContiner}>
                  <Typography variant={'h1'}>{successDialogTitle}</Typography>
                  <Button className={s.close} variant={'text'}>
                    <Close />
                  </Button>
                </div>
                <div className={s.hr_container}>
                  <hr className={s.custom_hr} />
                </div>
                <Typography variant={'regular16'}>
                  {successDialogText}
                  {emailAddress}
                </Typography>
              </ModalTitle>
              <div className={s.flexFiller} />
              <ModalButtonCancel asChild>
                <div className={s.buttonContainer}>
                  {useLinkOnSuccess ? (
                    <Button
                      as={Link}
                      href={'/login'}
                      onClick={handleCloseDialog}
                      variant={'primary'}
                    >
                      {modalButtonText}
                    </Button>
                  ) : (
                    <Button onClick={handleCloseDialog} variant={'primary'}>
                      {modalButtonText}
                    </Button>
                  )}
                </div>
              </ModalButtonCancel>
            </>
          )}
          {showErrorDialog && (
            <>
              <ModalTitle>
                <div className={s.topContiner}>
                  <Typography variant={'h1'}>{errorDialogTitle}</Typography>
                  <Button className={s.close} variant={'text'}>
                    <Close />
                  </Button>
                </div>
                <div className={s.hr_container}>
                  <hr className={s.custom_hr} />
                </div>
                <Typography variant={'regular16'}>{errorDialogText}</Typography>
                <Typography variant={'regular16'}>{error && JSON.stringify(error)}</Typography>
              </ModalTitle>
              <div className={s.flexFiller} />
              <ModalButtonCancel asChild>
                <div className={s.buttonContainer}>
                  <Button onClick={handleCloseErrorDialog} variant={'primary'}>
                    {modalButtonText}
                  </Button>
                </div>
              </ModalButtonCancel>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
