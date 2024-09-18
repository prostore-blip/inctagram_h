import React, { ChangeEvent, ReactNode, SyntheticEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { NextCarousel, PrevCarousel } from '@/assets/icons'
import { ImageIcon } from '@/assets/icons/image-icon'
import { FormTextArea } from '@/components/controll/FormTextArea'
import { ModalkaTrigger } from '@/components/modal'
import { CreatePostData, createPostSchema } from '@/components/modalCreatePost/schema'
import { UserGeneralInfoData } from '@/components/profile-settings/general-info-form/schema'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/uikit-temp-replacements/regular-dialog/RegularDialog'
import { useDotButton } from '@/hooks/useDotCarouselButton'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetMyProfileQuery } from '@/services/inctagram.profile.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  markup_editor_defaults,
  plugin_annotate,
  plugin_crop,
  plugin_filter,
  plugin_filter_defaults,
  plugin_finetune,
  plugin_finetune_defaults,
  setPlugins,
} from '@pqina/pintura'
import {
  LocaleAnnotate,
  LocaleCore,
  LocaleCrop,
  LocaleFilter,
  LocaleFinetune,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB'
import { PinturaEditor } from '@pqina/react-pintura'
import { DialogProps } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'

import s from './modalCreatePost.module.scss'
import pageStyles from '@/pages/generalInfo/page.module.scss'
import st from '@pqina/pintura/pintura.module.css'

import defaultAva from '../../../public/defaultAva.jpg'

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate)

const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  utils: ['crop', 'finetune', 'filter', 'annotate'],
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleMarkupEditor,
  },
}

const BYTES_IN_MB = 1024 * 1024
const IMAGE_SIZE_MAX_MB = 10

const maxImageSizeBytes = BYTES_IN_MB * IMAGE_SIZE_MAX_MB

export type AvatarSelectionDialogProps = {
  onSave: (image: File | null) => Promise<void>
  trigger: ReactNode
} & DialogProps

export function ModalAddPhotoForPost({
  onOpenChange,
  onSave,
  ...props
}: AvatarSelectionDialogProps) {
  const [openModal, setOpenModal] = useState(false)

  const { data: profile } = useGetMyProfileQuery()

  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<null | string>(null)
  const [imageError, setImageError] = useState<null | string>(null)

  const [file, setFile] = useState<File | null>(null)

  const { t } = useTranslation()

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file) {
        console.warn('error getting file from the input')
      }
      if (!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')) {
        //todo fix layout - png and jbg have to be on a new line ('\n doesn't work for some reason')
        //implement dynamic content for locales https://safronman.gitbook.io/next-i18n-rree78-ewe#id-8-dinamicheskii-perevod
        setImageError(t.profile.settings.wrongFileFormat)

        return
      }

      if (file.size >= maxImageSizeBytes) {
        setImageError(t.profile.settings.imageSizeExceeded)

        return
      }

      const newPreview = URL.createObjectURL(file)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)
      setFile(file)
    }
  }
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

  const handleSaveImage = async () => {
    try {
      await onSave(file)
      preview && URL.revokeObjectURL(preview)
      setPreview(null)
    } catch (error) {
      console.log(error)
    }
  }

  const triggerFileInput = () => {
    imageError && setImageError(null)

    if (!inputRef.current) {
      return
    }
    inputRef.current.click()
  }

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    setPreview(null)
    console.log(e)
  }
  const [toLoadForm, setToLoadForm] = useState(false)
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      //being closed
      preview && URL.revokeObjectURL(preview)
      imageError && setImageError(null)
      setPreview(null)
      setFile(null)
      setToLoadForm(false)
    }
    setOpenModal(open)
  }
  /**
   * массив images поста для карусели
   */
  const imagesPostArray = Array(5)
    .fill(null)
    .map((_, i) => {
      return (
        <div className={s.emblaSlide} key={i}>
          <div className={s.postImage}>
            <Image alt={'image'} fill priority src={preview ?? defaultAva.src} />
          </div>
        </div>
      )
    })
  /**
   * react hook form
   */
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CreatePostData>({
    mode: 'onChange',
    resolver: zodResolver(createPostSchema),
  })
  const textAreaValue = watch('descriptionPost')

  return (
    <>
      <Dialog {...props} onOpenChange={handleOpenChange} open={openModal}>
        <ModalkaTrigger asChild className={clsx(openModal && s.open)}>
          {props.trigger}
        </ModalkaTrigger>
        <DialogContent className={clsx(s.content, preview && toLoadForm && s.widthBig)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Typography as={'h1'} variant={'h1'}>
                Add Photo
              </Typography>
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>Select image from your computer</DialogDescription>
            </VisuallyHidden>
            {!toLoadForm && (
              <DialogClose asChild>
                <Button className={s.closeButton} variant={'text'}>
                  <CloseIcon />
                </Button>
              </DialogClose>
            )}
            {preview && toLoadForm && (
              <Button className={s.publisheButton} variant={'text'}>
                <Typography variant={'h3'}>Publish</Typography>
              </Button>
            )}
          </DialogHeader>
          <div style={{ height: 'calc(100% - 61px)', position: 'relative' }}>
            <input
              accept={'image/*'}
              hidden
              onChange={handleImageSelect}
              ref={inputRef}
              type={'file'}
            />

            {!preview && (
              <div className={s.flexColumn}>
                {imageError && (
                  <div className={s.errorBox}>
                    <Typography variant={'regularBold14'}>Error!</Typography>
                    <Typography variant={'regular14'}>{imageError}</Typography>
                  </div>
                )}
                <div className={s.imageContainer}>{!preview && <ImageIcon size={36} />}</div>
                <div className={s.buttonsBlock}>
                  <Button className={s.selectButton} onClick={triggerFileInput} variant={'primary'}>
                    {t.common.selectFromComputer}
                  </Button>
                  <Button className={s.selectButton} onClick={() => {}} variant={'outline'}>
                    Open Draft
                  </Button>
                </div>
              </div>
            )}
            {preview && !toLoadForm && (
              <PinturaEditor
                {...editorDefaults}
                className={`${st.pintura}`}
                onLoad={res => console.log('load image', res)}
                onProcess={({ dest }) => {
                  setPreview(URL.createObjectURL(dest))
                  setToLoadForm(true)
                }}
                src={preview}
              />
            )}
            {preview && toLoadForm && (
              <Card className={s.cardPost} variant={'dark300'}>
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
                <form className={s.form} onSubmit={handleSubmit(() => {})}>
                  <div className={s.avaUserNameBlock}>
                    <img
                      alt={'ava'}
                      height={36}
                      src={profile?.avatars[1]?.url ?? defaultAva.src}
                      width={36}
                    />
                    <Typography variant={'h3'}>{profile?.userName}</Typography>
                  </div>
                  <div className={s.textAreaWrapper}>
                    <FormTextArea
                      className={s.textArea}
                      control={control}
                      errorMessage={errors.descriptionPost?.message}
                      label={'Add publication descriptions'}
                      maxLength={10}
                      name={'descriptionPost'}
                      placeholder={'Description post'}
                    />
                    <p>{textAreaValue?.length ?? 0}/500</p>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
