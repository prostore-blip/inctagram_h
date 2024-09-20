import React, { ChangeEvent, ReactNode, SyntheticEvent, useRef, useState } from 'react'

import { ImageIcon } from '@/assets/icons/image-icon'
import { ModalkaTrigger } from '@/components/modal'
import { CarouselCreatePost } from '@/components/modalCreatePost/CarouselCreatePost'
import { FormCreatePost } from '@/components/modalCreatePost/FormCreatePost'
import { PhotoEditorForCreatePost } from '@/components/modalCreatePost/PhotoEditorForCreatePost'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/uikit-temp-replacements/regular-dialog/RegularDialog'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetMyProfileQuery } from '@/services/inctagram.profile.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { PinturaDefaultImageWriterResult } from '@pqina/pintura'
import { DialogProps } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import clsx from 'clsx'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'

import s from './modalCreatePost.module.scss'

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
  /**
   * стейт перехода к форме поста после загрузки картинок поста
   */
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
   * коллбэк события onProcess из DatePicker
   * @param dest - данные от события onProcess
   */
  const callback = ({ dest }: PinturaDefaultImageWriterResult) => {
    setPreview(URL.createObjectURL(dest))
    setToLoadForm(true)
  }

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
              <PhotoEditorForCreatePost callback={callback} src={preview} />
            )}
            {preview && toLoadForm && (
              <Card className={s.cardPost} variant={'dark300'}>
                <CarouselCreatePost src={preview} />
                <FormCreatePost profile={profile} />
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
