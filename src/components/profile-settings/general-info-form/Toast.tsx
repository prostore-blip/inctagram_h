import { Close } from '@/assets/icons/close'
import { Button, Typography } from '@chrizzo/ui-kit'
import { toast } from 'sonner'

import pageStyles from '@/pages/generalInfo/page.module.scss'

type Props = {
  jsx: number | string
  title: string
}
export const Toast = ({ jsx, title }: Props) => {
  return (
    <div className={pageStyles.toastWrapper}>
      <Typography variant={'regular16'}>{title}</Typography>
      <Button className={pageStyles.close} onClick={() => toast.dismiss(jsx)} variant={'text'}>
        <Close />
      </Button>
    </div>
  )
}
