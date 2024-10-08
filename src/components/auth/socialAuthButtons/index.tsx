import { GitHubIcon, GoogleIcon } from '@/assets/icons'
import { Button } from '@chrizzo/ui-kit'

import s from './socialAuthButtons.module.scss'

type Props = {
  googleLoginAndRegister: () => void
}

export const SocialAuthButtons = ({ googleLoginAndRegister }: Props) => {
  const githubLoginAndRegister = () => {}

  return (
    <div className={s.icons}>
      <Button className={s.icon} onClick={googleLoginAndRegister} type={'button'} variant={'text'}>
        <GoogleIcon height={36} width={36} />
      </Button>
      <Button className={s.icon} onClick={githubLoginAndRegister} type={'button'} variant={'text'}>
        <GitHubIcon height={36} width={36} />
      </Button>
    </div>
  )
}
