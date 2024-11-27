import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { DeleteAvatar } from '@/assets/icons'
import { ImageIcon } from '@/assets/icons/ImageIcon'
import { AvatarDialog } from '@/components/create-avatar/AvatarDIalog'
import { ImageWrapper } from '@/components/create-avatar/ImageWrapper'
import { ModalConfirmDeleteAvatar } from '@/components/create-avatar/ModalConfirmDeleteAvatar'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import { clsx } from 'clsx'

import s from './avatarSelector.module.scss'

type ImageSelectorProps = {
  initialValue?: null | string
  onValueChange: (file: File | null) => void
} & ComponentPropsWithoutRef<'input'>

export function AvatarSelector({ initialValue, onValueChange, ...restProps }: ImageSelectorProps) {
  const [savedImage, saveImage] = useState<null | string>(null)

  const [preview, setPreview] = useState<null | string>(null)

  const [showDialog, setShowDialog] = useState<boolean>(false)

  const { t } = useTranslation()

  // const [deleteAvatarProfile, { isLoading }] = useDeleteAvatarProfileMutation()

  useEffect(() => {
    if (initialValue) {
      setPreview(initialValue)
    }

    return () => {
      if (preview && preview !== initialValue) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [initialValue])

  const handleSaveImage = async (image: File | null) => {
    if (!image) {
      saveImage(null)

      return
    }
    if (!image.type.includes('image')) {
      console.warn('not an image file')

      return
    }
    const newPreview = URL.createObjectURL(image)

    if (preview && preview !== initialValue) {
      URL.revokeObjectURL(preview)
    }
    saveImage(newPreview)
    onValueChange(image)
    setShowDialog(false)
  }

  const openSelectDialog = () => {
    setShowDialog(true)
  }

  const handleOpenChange = (open: boolean) => {
    setShowDialog(open)
  }

  const clearAvatar = () => {
    onValueChange(null)
    saveImage(null)
  }

  const deleteAvatar = (setFn: Function) => {
    // deleteAvatarProfile()
    //   .unwrap()
    //   .then(() => {
    //     setFn(false)
    //   })
    clearAvatar()
    setPreview(null)
    setFn(false)
  }

  return (
    <>
      <AvatarDialog
        modal
        onOpenChange={handleOpenChange}
        onSave={handleSaveImage}
        open={showDialog}
      />
      <div className={s.container}>
        <div className={clsx(s.imageContainer)}>
          {!savedImage && <ImageIcon size={36} />}
          {(savedImage || preview) && (
            <ModalConfirmDeleteAvatar
              callback={deleteAvatar}
              title={t.profile.avatar.deletePhotoModalTitle}
              variantTriggerButton={
                <Button className={s.deleteAva} variant={'text'}>
                  <DeleteAvatar />
                </Button>
              }
            >
              <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
                {t.profile.avatar.deletePhotoModalDescription}
              </Typography>
            </ModalConfirmDeleteAvatar>
          )}
          {savedImage && <ImageWrapper src={savedImage} />}
          {!savedImage && preview && <ImageWrapper src={preview} />}
        </div>
        <Button
          className={s.addAvaButton}
          onClick={openSelectDialog}
          type={'button'}
          variant={'outline'}
        >
          {t.profile.settings.addProfilePhoto}
        </Button>
      </div>
    </>
  )
}
