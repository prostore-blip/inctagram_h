import { useState } from 'react'

import { AuthModal } from '@/components/auth/sign-up/authModal'
import { useTranslation } from '@/hooks/useTranslation'
import { useResendRegistrationLinkMutation } from '@/services'
import { ErrorResponse } from '@/services/incta-team-api/auth/instagram.auth.type'
import { Button, TextField, Typography } from '@chrizzo/ui-kit'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './linkExpired.module.scss'

type Props = {
  email: string
}

export const LinkExpired = ({ email }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState('')

  const [resendRegistrationLink, { error, isLoading }] = useResendRegistrationLinkMutation()

  const { t } = useTranslation()

  const { push } = useRouter()

  const closeModalAndRedirect = () => {
    setIsModalOpen(false)
    void push('/login')
  }

  const onResendButtonClick = async () => {
    await resendRegistrationLink({ email: value })
    setIsModalOpen(true)
  }

  const errorMessage = (error as ErrorResponse)?.data?.errorsMessages[0]?.message

  return (
    <>
      <Head>
        <title>{t.signUp.linkExpired}</title>
      </Head>
      <div className={s.mainContainer}>
        <div className={s.confirmContainer}>
          <Typography className={s.textTitle} variant={'h1'}>
            {t.signUp.linkExpired}
          </Typography>

          <Typography className={s.infoText}>{t.signUp.linkExpiredDescription}</Typography>
        </div>
        <div className={s.inputButtonContainer}>
          <TextField
            className={s.textField}
            label={'Email'}
            onValueChange={setValue}
            placeholder={'example@gmail.com'}
            type={'email'}
            value={value}
          />
          <Button
            className={s.resendButton}
            disabled={!!errorMessage || isLoading}
            onClick={onResendButtonClick}
            variant={'primary'}
          >
            {t.signUp.resendVerificationLink}
          </Button>
        </div>

        <Image
          alt={t.signUp.linkExpired}
          height={'352'}
          priority
          src={'/confirmWaitingTime.svg'}
          width={'473'}
        />
        <AuthModal
          description={errorMessage ?? t.signUp.emailSentText(email)}
          isOpen={isModalOpen}
          onClose={closeModalAndRedirect}
          title={errorMessage ? t.error : t.signUp.emailSent}
        />
      </div>
    </>
  )
}
