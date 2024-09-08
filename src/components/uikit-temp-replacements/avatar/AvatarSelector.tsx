import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { ImageIcon } from '@/assets/icons/image-icon'
import { AvatarDialog } from '@/components/profile-settings/avatar-dialog/AvatarDialog'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@chrizzo/ui-kit'
import { clsx } from 'clsx'
import Image from 'next/image'

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

  return (
    <>
      <AvatarDialog
        modal
        onOpenChange={handleOpenChange}
        onSave={handleSaveImage}
        open={showDialog}
      />
      <div className={s.container}>
        <div style={{ position: 'relative' }}>
          {initialValue ||
            (savedImage && (
              <Button className={clsx(s.clearButton)} onClick={clearAvatar} type={'button'}>
                <Close />
              </Button>
            ))}
          <div className={clsx(s.imageContainer, s.round)}>
            {!savedImage && <ImageIcon size={36} />}

            {savedImage && (
              <Image
                alt={'profile image'}
                fill
                sizes={'192px'}
                src={savedImage}
                style={{ objectFit: 'cover' }}
              />
            )}
            {!savedImage && preview && (
              <Image
                alt={'profile image'}
                fill
                sizes={'192px'}
                src={preview}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
        <Button onClick={openSelectDialog} type={'button'} variant={'outline'}>
          {t.profile.settings.addProfilePhoto}
        </Button>
      </div>
    </>
  )
}
