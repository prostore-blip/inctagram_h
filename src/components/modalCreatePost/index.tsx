import React, { ChangeEvent, ReactNode, useRef, useState } from 'react'

import { ModalkaTrigger } from '@/components/modal'
import { CarouselCreatePost } from '@/components/modalCreatePost/CarouselCreatePost'
import { FormCreatePost } from '@/components/modalCreatePost/FormCreatePost'
import { LoadImageFromPCBlock } from '@/components/modalCreatePost/LoadImageFromPCBlock'
import { PhotoEditorForCreatePost } from '@/components/modalCreatePost/PhotoEditorForCreatePost'
import { CreatePostData } from '@/components/modalCreatePost/schema'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/uikit-temp-replacements/regular-dialog/RegularDialog'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useCreateImagesPostMutation,
  useCreatePostMutation,
} from '@/services/inctagram.posts.service'
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
  trigger: ReactNode
} & DialogProps

export function ModalCreatePost({ onOpenChange, ...props }: AvatarSelectionDialogProps) {
  /**
   * стейт контроля открытия/закрытия модалки
   */
  const [openModal, setOpenModal] = useState(false)
  /**
   * ref для инпута с type=file
   */
  const inputRef = useRef<HTMLInputElement>(null)
  /**
   * ссылка на загруженную картинку с ПК. Нужно для логики отображения/сокрытия редактора фото и других элементов,
   * а также для src самого редактора фото
   */
  const [preview, setPreview] = useState<null | string>(null)
  /**
   * стейт ошибки загрузки с инпута type=file файла большого размера или недопустимого типа
   */
  const [imageError, setImageError] = useState<null | string>(null)
  /**
   * интернационализация
   */
  const { t } = useTranslation()

  /**
   * отправка на сервер картинок поста
   */
  const [createPost] = useCreatePostMutation()

  /**
   * отправка на сервер картинок поста
   */
  const [createImagesPost, { data: imagesPost }] = useCreateImagesPostMutation()
  /**
   * Обработчик загрузки файла с инпута type=file. Валидируем на загрузку нужного типа и размера файла - картинка.
   * Сетаем ошибки. Сохраняем сам файл и строковую ссылку на файл.
   * @param e - event onChange input type=file
   */
  const imageSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
    }
  }
  /**
   * оБработчик клика на инпут с type=file
   */
  const triggerFileInputHandler = () => {
    imageError && setImageError(null)

    if (!inputRef.current) {
      return
    }
    inputRef.current.click()
  }

  /**
   * стейт перехода к форме поста после загрузки картинок поста
   */
  const [toLoadForm, setToLoadForm] = useState(false)
  /**
   * Обработчик открытия/закрытия модалки создания поста. Если закрываем модалку, то очищаем все стейты,
   * чтобы при повторном открытии не подтягивалось ранее загруженная картинка
   * @param open - контролируемое состояние модалки. На закрытие приходит false, на открытие приходит true
   */
  const openModalHandler = (open: boolean) => {
    if (!open) {
      preview && URL.revokeObjectURL(preview)
      imageError && setImageError(null)
      setPreview(null)
      setToLoadForm(false)
    }
    setOpenModal(open)
  }

  /**
   * коллбэк события onProcess (событие сохранения отредактированной картинки поста) из редактора фото.
   * Создаём объект formData и сохраняем в нём file из редактора. Отправляем file на сервер.
   * Если запрос успешный, то окрываем форму описания поста.
   * @param dest - File отредактированный
   */
  const loadEditedImageHandler = async ({ dest }: PinturaDefaultImageWriterResult) => {
    const formData = new FormData()

    formData.append('file', dest)
    await createImagesPost(formData)
    setToLoadForm(true)
  }
  /**
   * обработчик формы создания поста. Если есть данные из формы и есть загруженная ранее картинка поста,
   * то отправляем описание поста и id картинки на сервер. Если запрос успешен, то сбрасываем превью, закрываем
   * вывод формы описания поста и закрываем модалку создания поста
   * @param data - данные из формы (пока что только описание поста)
   */
  const submitFormHandler = async (data: CreatePostData) => {
    if (data && imagesPost) {
      const post = {
        childrenMetadata: [{ uploadId: imagesPost?.images[0].uploadId }],
        description: data.descriptionPost,
      }

      await createPost(post)
      preview && URL.revokeObjectURL(preview)
      setPreview(null)
      setToLoadForm(false)
      setOpenModal(false)
    }
  }

  return (
    <>
      <Dialog {...props} onOpenChange={openModalHandler} open={openModal}>
        <ModalkaTrigger asChild className={clsx(openModal && s.open)}>
          {props.trigger}
        </ModalkaTrigger>
        <DialogContent
          className={clsx(s.content, preview && toLoadForm && s.widthBig)}
          onInteractOutside={event => event.preventDefault()}
        >
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
              <Button className={s.publisheButton} form={'submitPostForm'} variant={'text'}>
                <Typography variant={'h3'}>Publish</Typography>
              </Button>
            )}
          </DialogHeader>
          <div style={{ height: 'calc(100% - 61px)', position: 'relative' }}>
            <LoadImageFromPCBlock
              imageError={imageError}
              onChange={imageSelectHandler}
              preview={preview}
              ref={inputRef}
              triggerFileInput={triggerFileInputHandler}
            />
            {preview && !toLoadForm && (
              <PhotoEditorForCreatePost callback={loadEditedImageHandler} src={preview} />
            )}
            {preview && toLoadForm && (
              <Card className={s.cardPost} variant={'dark300'}>
                <CarouselCreatePost imagesPost={imagesPost} />
                <FormCreatePost submitForm={submitFormHandler} />
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
