import { clsx } from 'clsx'
import Image from 'next/image'

import s from './avatarSelector.module.scss'

type Props = {
  src: string
}
export const ImageWrapper = ({ src }: Props) => {
  return (
    <Image
      alt={'profile image'}
      className={clsx(s.round)}
      fill
      sizes={'192px'}
      src={src}
      style={{ objectFit: 'cover' }}
    />
  )
}
