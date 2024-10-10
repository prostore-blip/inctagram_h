import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'

import { ImageIcon } from '@/assets/icons/ImageIcon'
import { PhotoEditorForCreatePost } from '@/components/create-avatar/PhotoEditorForCreatePost'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import { PinturaDefaultImageWriterResult } from '@pqina/pintura'
import { DialogProps } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import clsx from 'clsx'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'

import s from './avatarDialog.module.scss'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../uikit-temp-replacement/regular-dialog/RegularDialog'

const BYTES_IN_MB = 1024 * 1024
const IMAGE_SIZE_MAX_MB = 10

const maxImageSizeBytes = BYTES_IN_MB * IMAGE_SIZE_MAX_MB

export type AvatarSelectionDialogProps = {
  onSave: (image: File | null) => Promise<void>
} & DialogProps

export function AvatarDialog({ onOpenChange, onSave, ...props }: AvatarSelectionDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<null | string>(null)
  const [imageError, setImageError] = useState<null | string>(null)
  const [showPhotoEditor, setShowPhotoEditor] = useState(false)

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
        setImageError('wrongFileFormat')

        return
      }

      if (file.size >= maxImageSizeBytes) {
        setImageError('imageSizeExceeded')

        return
      }

      const newPreview = URL.createObjectURL(file)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)
      setFile(file)
      setShowPhotoEditor(true)
    }
  }

  const handleSaveImage = async () => {
    try {
      await onSave(file)
      preview && URL.revokeObjectURL(preview)
      setPreview(null)
    } catch (error) {
      /* empty */
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
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      //being closed
      preview && URL.revokeObjectURL(preview)
      imageError && setImageError(null)
      setPreview(null)
      setFile(null)
    }

    onOpenChange && onOpenChange(open)
  }

  return (
    <Dialog {...props} onOpenChange={handleOpenChange}>
      <DialogContent className={s.content}>
        <DialogHeader>
          <DialogTitle asChild>
            <Typography as={'h1'} variant={'h1'}>
              {t.profile.settings.addProfilePhoto}
            </Typography>
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Select image from your computer</DialogDescription>
          </VisuallyHidden>
          <DialogClose asChild>
            <Button className={s.closeButton} variant={'text'}>
              <CloseIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <input
          accept={'image/*'}
          hidden
          onChange={handleImageSelect}
          ref={inputRef}
          type={'file'}
        />

        <div className={s.flexColumn}>
          {imageError && (
            <div className={s.errorBox}>
              <Typography variant={'regularBold14'}>Error!</Typography>
              <Typography variant={'regular14'}>{imageError}</Typography>
            </div>
          )}
          <div
            className={clsx(
              s.imageContainer,
              imageError && s.marginTopHidden,
              preview && s.isPreview
            )}
          >
            {!preview && <ImageIcon size={36} />}
            {preview && !showPhotoEditor && (
              <div className={s.imageWr}>
                <Image
                  alt={'profile image'}
                  fill
                  onError={handleImageError}
                  sizes={'300px'}
                  src={preview}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            {showPhotoEditor && preview && (
              <div style={{ height: '100%', width: '100%' }}>
                <PhotoEditorForCreatePost
                  callback={(d: PinturaDefaultImageWriterResult) => {
                    setFile(d.dest)
                    const newPreview = URL.createObjectURL(d.dest)

                    setShowPhotoEditor(false)
                    setPreview(newPreview)
                  }}
                  src={preview}
                />
              </div>
            )}
          </div>
          {!preview && (
            <Button className={s.selectButton} onClick={triggerFileInput} variant={'primary'}>
              {t.common.selectFromComputer}
            </Button>
          )}
        </div>
        {preview && (
          <div className={s.dialogFooter}>
            <div className={s.flexFiller} />
            <Button
              className={s.saveButton}
              disabled={showPhotoEditor}
              onClick={handleSaveImage}
              variant={'primary'}
            >
              {t.common.save}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
