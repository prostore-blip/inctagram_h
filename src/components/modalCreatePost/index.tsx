import React, { ChangeEvent, ReactNode, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ModalTrigger } from '@/components/modal'
import { HeaderBody } from '@/components/modalCreatePost/HeaderBody'
import { HeaderContent } from '@/components/modalCreatePost/HeaderContent'
import { maxImageSizeBytes } from '@/components/modalCreatePost/consts'
import { useAddIdToArray } from '@/components/modalCreatePost/hook/useAddIdToArray'
import { CreatePostData, createPostSchema } from '@/components/modalCreatePost/schema'
import {
  Dialog,
  DialogContent,
} from '@/components/uikit-temp-replacement/regular-dialog/RegularDialog'
import { useIndexedDB } from '@/hooks/useIndexedDB'
import { useTranslation } from '@/hooks/useTranslation'
import { db } from '@/services/db'
import { useCreatePostMutation } from '@/services/incta-team-api/posts/posts-service'
import { useGetProfileQuery } from '@/services/incta-team-api/profile/profile-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './modalCreatePost.module.scss'

export type AvatarSelectionDialogProps = {
  trigger: ReactNode
} & DialogProps

export function ModalCreatePost({ onOpenChange, ...props }: AvatarSelectionDialogProps) {
  const router = useRouter()
  /**
   * стейт контроля открытия/закрытия модалки создания поста
   */
  const [openModal, setOpenModal] = useState(false)
  /**
   * блокировка кнопки Next, когда открыли редактор фото
   */
  const [isDIsabledNextButton, setIsDIsabledNextButton] = useState(false)
  /**
   * Запрос на своим профилем юзера для отображения вытягивания userName
   */
  //TODO возвращаемые данные фейковые
  const { data: profile } = useGetProfileQuery(
    { id: router.query.id as string },
    { skip: !openModal }
  )
  /**
   * ref для инпута с type=file
   */
  const inputRef = useRef<HTMLInputElement>(null)
  /**
   * ссылка на загруженную картинку с ПК. Нужно для логики отображения/сокрытия редактора фото и других элементов,
   * а также для src самого редактора фото
   */
  const [preview, setPreview] = useState<{ file: File[]; preview: string[] }>({
    file: [],
    preview: [],
  })
  /**
   * массив оригинальных картинок с ПК. Если мы отредактировали картинку и она нам не понравилась, то из этого
   * массива берём оригинальную картинку и заменяем ей отредактирвоанную картинку в карусели
   */
  const [loadedFiles, setLoadedFiles] = useState<File[]>([])
  /**
   * стейт ошибки загрузки с инпута type=file файла большого размера или недопустимого типа
   */
  const [imageError, setImageError] = useState<null | string>(null)
  /**
   * показать модалку подтверждения закрытия основной модалки создания поста. Если на
   * этапе показа формы с описанием поста мы тыкаем вне границ модалки, то срабатывает этот стейт (true) и
   * открывает модалку с подтвержением закрытия
   */
  const [isShowModalConfirmCloseModalCreatePost, setIsShowModalConfirmCloseModalCreatePost] =
    useState(false)
  /**
   * стейт перехода к форме поста после загрузки картинок поста
   */
  const [toLoadForm, setToLoadForm] = useState(false)
  /**
   * стейт перехода к карусели после загрузки картинок с ПК
   */
  const [toLoadImages, setToLoadImages] = useState(false)
  /**
   * интернационализация
   */
  const { t } = useTranslation()
  /**
   * хук RTKQ отправки на сервер описания поста
   */
  const [createPost] = useCreatePostMutation()
  /**
   * Обработчик загрузки файла с инпута type=file. Валидируем на загрузку нужного типа и размера файла - картинка.
   * Сетаем ошибки. Сохраняем сам файл и строковую ссылку на файл.
   * @param e - event onChange input type=file
   */
  const imageSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList && fileList.length > 0) {
      const fileArray = Array.from(fileList)
      const previewArray: string[] = []
      const arrayFiles: File[] = []

      fileArray.forEach(file => {
        if (!file) {
          console.warn('error getting file from the input')

          return
        }
        if (
          !file.type.includes('png') &&
          !file.type.includes('jpg') &&
          !file.type.includes('jpeg')
        ) {
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

        previewArray.push(newPreview)
        arrayFiles.push(file)
      })
      setPreview({ file: arrayFiles, preview: previewArray })
      setLoadedFiles(arrayFiles)
      setToLoadImages(true)
    }
  }
  /**
   * оБработчик клика на инпут с type=file
   */
  const triggerFileInputHandler = () => {
    imageError && setImageError(null)
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  /**
   * Хелпер очистки стейтов при закрыти модалки создания поста
   */
  const clearStatesCreatePost = () => {
    if (preview.preview.length) {
      preview.preview.forEach(pr => {
        URL.revokeObjectURL(pr)
      })
    }
    imageError && setImageError(null)
    setPreview({ file: [], preview: [] })
    setToLoadForm(false)
    setToLoadImages(false)
    setOpenModal(false)
    formState.reset()
  }
  /**
   * Обработчик открытия/закрытия модалки создания поста. Если закрываем модалку, то очищаем все стейты,
   * чтобы при повторном открытии не подтягивалось ранее загруженная картинка
   * @param open - контролируемое состояние модалки. На закрытие приходит false, на открытие приходит true
   */
  const openModalHandler = (open: boolean) => {
    if (!open) {
      clearStatesCreatePost()

      return null
    }
    setOpenModal(open)
  }
  /**
   * react hook form
   */
  const formState = useForm<CreatePostData>({
    mode: 'onChange',
    resolver: zodResolver(createPostSchema),
  })
  /**
   * обработчик формы создания поста. Если есть данные из формы и есть загруженная ранее картинка поста,
   * то отправляем описание поста и id картинки на сервер. Если запрос успешен, то сбрасываем превью, закрываем
   * вывод формы описания поста, закрываем модалку создания поста и очищаем базу данных indexedDB
   * @param data - данные из формы (пока что только описание поста)
   */
  const submitFormHandler = async (data: CreatePostData) => {
    if (preview.file.length) {
      const formData = new FormData()

      preview.file.forEach(f => {
        formData.append('image', f)
      })
      formData.append('description', data.descriptionPost as string)

      await createPost(formData)
      await db.draftPost.clear()
      clearStatesCreatePost()
    }
  }
  /**
   * массив для карусели на основе загруженных с ПК картинок, добавляем id
   */
  const carouselArray = useAddIdToArray(preview.preview)
  /**
   * обработчик нажатия на клавишу НАЗАД в хедере модалки создания поста
   */
  const onClickReturnAddPhoto = () => {
    if (toLoadImages) {
      if (preview.preview.length) {
        preview.preview.forEach(pr => {
          URL.revokeObjectURL(pr)
        })
      }
      imageError && setImageError(null)
      setPreview({ file: [], preview: [] })
      setToLoadForm(false)
      setToLoadImages(false)
      formState.reset()
    }
    if (toLoadForm) {
      setToLoadForm(false)
      setToLoadImages(true)
    }
  }
  /**
   * кастомный хук работы с базой indexedDB. Возвращает функции сохранения в базу данных и чтения из базы
   */
  const { getDraftPost, saveDraftPost } = useIndexedDB({
    clearStatesCreatePost,
    formState,
    preview,
    setIsShowModalConfirmCloseModalCreatePost,
    setPreview,
    setToLoadForm,
  })
  /**
   * обраьотчик кнопки NEXT: переход к форме описания поста
   */
  const onClickNextButtonHandler = () => {
    setToLoadImages(false)
    setToLoadForm(true)
  }

  return (
    <>
      <Dialog {...props} onOpenChange={openModalHandler} open={openModal}>
        <ModalTrigger asChild className={clsx(openModal && s.open)}>
          {props.trigger}
        </ModalTrigger>
        <DialogContent
          className={clsx(s.content, toLoadForm && s.widthBig)}
          onInteractOutside={event => {
            event.preventDefault()
            if (preview && toLoadForm) {
              setIsShowModalConfirmCloseModalCreatePost(true)
            }
          }}
        >
          <HeaderContent
            clearStatesCreatePost={clearStatesCreatePost}
            imageError={imageError ?? ''}
            isDIsabledNextButton={isDIsabledNextButton}
            isPreview={!!preview.preview.length}
            isShowModalConfirmCloseModalCreatePost={isShowModalConfirmCloseModalCreatePost}
            onClickNextButtonHandler={onClickNextButtonHandler}
            onClickReturnAddPhoto={onClickReturnAddPhoto}
            saveDraftPost={saveDraftPost}
            setIsShowModalConfirmCloseModalCreatePost={setIsShowModalConfirmCloseModalCreatePost}
            toLoadForm={toLoadForm}
            toLoadImages={toLoadImages}
          />
          <HeaderBody
            carouselArray={carouselArray}
            formState={formState}
            getDraftPost={getDraftPost}
            imageError={imageError ?? ''}
            imageSelectHandler={imageSelectHandler}
            isPreview={!!preview.preview.length}
            loadedFiles={loadedFiles}
            ref={inputRef}
            setIsDIsabledNextButton={setIsDIsabledNextButton}
            setPreview={setPreview}
            submitFormHandler={submitFormHandler}
            toLoadForm={toLoadForm}
            toLoadImages={toLoadImages}
            triggerFileInputHandler={triggerFileInputHandler}
            userName={profile?.userName ?? 'No userName'}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
