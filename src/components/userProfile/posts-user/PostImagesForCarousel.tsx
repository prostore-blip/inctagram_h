import React from 'react'

import Image from 'next/image'

import s from '@/components/userProfile/posts-user/posts.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

type Props = {
  image: string
  showMore?: boolean
}
export const PostImagesForCarousel = ({ image, showMore = false }: Props) => {
  return Array(4)
    .fill(image)
    .map(image => {
      return (
        <div className={s.emblaSlide} key={image.uploadId}>
          <div className={s.postImage} data-showmore={showMore}>
            <Image
              alt={'image'}
              height={image?.height}
              priority
              src={image?.url || defaultAva}
              width={image?.width}
            />
          </div>
        </div>
      )
    })
}
