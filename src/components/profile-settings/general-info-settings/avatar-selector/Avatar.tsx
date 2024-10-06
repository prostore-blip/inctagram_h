import { ComponentPropsWithoutRef } from 'react'

import { ImageIcon } from '@/assets/icons/image-icon'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './avatar.module.scss'

type ImageSelectorProps = {
  fallback?: string
  image?: null | string
} & ComponentPropsWithoutRef<'div'>

//todo create avatar component with radix primitives
//todo add size and shape control prop (72, 192, 222?, 300)
export function Avatar({ image, ...restProps }: ImageSelectorProps) {
  return (
    <>
      <div className={s.container} {...restProps}>
        <div className={clsx(s.imageContainer, s.round)}>
          {!image && <ImageIcon size={36} />}
          {image && (
            <Image
              alt={'profile image'}
              fill
              sizes={'192px'}
              src={image}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
    </>
  )
}
