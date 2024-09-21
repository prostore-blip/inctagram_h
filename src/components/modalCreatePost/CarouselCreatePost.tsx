import React from 'react'

import { NextCarousel, PrevCarousel } from '@/assets/icons'
import { useDotButton } from '@/hooks/useDotCarouselButton'
import { ResponseCreateImagesPost } from '@/services/types'
import { Button } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import s from '@/components/modalCreatePost/modalCreatePost.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type CarouselProps = {
  imagesPost: ResponseCreateImagesPost | undefined
}
export const CarouselCreatePost = ({ imagesPost }: CarouselProps) => {
  /**
   * хук из библиотеки карусели для контента модалки (там, где большое изображение нужно прокручивать)
   */
  const [emblaRefBig, emblaApiBig] = useEmblaCarousel()
  /**
   * кастомный хук для точек перехода к слайдам карусели для контента модалки  (там, где большое
   * изображение нужно прокручивать)
   */
  const {
    onDotButtonClick: onDotButtonClickBig,
    scrollSnaps: scrollSnapsBig,
    selectedIndex: selectedIndexBig,
  } = useDotButton(emblaApiBig)
  /**
   * массив images поста для карусели
   */
  const imagesPostArray = imagesPost?.images?.map(image => {
    return (
      <div className={s.emblaSlide} key={image.uploadId}>
        <div className={s.postImage}>
          <Image alt={'image'} fill priority src={image.url ?? defaultAva.src} />
        </div>
      </div>
    )
  })

  return (
    <div className={s.postImageContent}>
      <div className={s.embla} ref={emblaRefBig}>
        <div className={s.emblaContainer}> {imagesPostArray}</div>
      </div>
      <Button
        className={s.prevModalButton}
        onClick={() => {
          emblaApiBig?.scrollPrev()
        }}
        type={'button'}
      >
        <PrevCarousel height={'48'} width={'48'} />
      </Button>
      <Button
        className={s.nextModalButton}
        onClick={() => {
          emblaApiBig?.scrollNext()
        }}
        type={'button'}
      >
        <NextCarousel height={'48'} width={'48'} />
      </Button>
      <div className={s.dotes}>
        {scrollSnapsBig.map((_, index) => (
          <div
            className={clsx(s.dote, index === selectedIndexBig && s.activeDot)}
            key={index}
            onClick={() => onDotButtonClickBig(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}
