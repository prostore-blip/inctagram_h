import React from 'react'

import { GitHubIcon, GoogleIcon } from '@/assets/icons'
import { Toast } from '@/components/layouts/Toast'
import { useLazySignInWithGithubQuery, useLazySignInWithGoogleQuery } from '@/services'
import { Button } from '@chrizzo/ui-kit'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import s from './socialAuthButtons.module.scss'

type Props = {
  googleLoginAndRegister?: () => void
}

export const SocialAuthButtons = () => {
  const [signInWithGithub] = useLazySignInWithGithubQuery()
  const [signInWithGoogle] = useLazySignInWithGoogleQuery()

  const router = useRouter()
  const githubLoginAndRegister = async () => {
    try {
      await signInWithGithub().unwrap()
      void router.push('/profile')
    } catch (e) {
      toast.custom(() => <Toast text={"Error. Post can't been saved"} variant={'error'} />, {
        duration: 5000,
      })
    }
  }
  const googleLoginAndRegister = async () => {
    try {
      await signInWithGoogle().unwrap()
      void router.push('/profile')
    } catch (e) {
      toast.custom(() => <Toast text={"Error. Post can't been saved"} variant={'error'} />, {
        duration: 5000,
      })
    }
  }

  return (
    <div className={s.icons}>
      <Button className={s.icon} onClick={googleLoginAndRegister} type={'button'} variant={'text'}>
        <GoogleIcon />
      </Button>
      <Button className={s.icon} onClick={githubLoginAndRegister} type={'button'} variant={'text'}>
        <GitHubIcon />
      </Button>
    </div>
  )
}
