import React, { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Toast } from '@/components/layouts/Toast'
import { CreatePostData } from '@/components/modalCreatePost/schema'
import { db } from '@/services/db'
import { toast } from 'sonner'

type Props = {
  clearStatesCreatePost: () => void
  formState: UseFormReturn<CreatePostData>
  preview: { file: File[]; preview: string[] }
  setIsShowModalConfirmCloseModalCreatePost: Dispatch<SetStateAction<boolean>>
  setPreview: Dispatch<SetStateAction<{ file: File[]; preview: string[] }>>
  setToLoadForm: Dispatch<SetStateAction<boolean>>
}
export const useIndexedDB = ({
  clearStatesCreatePost,
  formState,
  preview,
  setIsShowModalConfirmCloseModalCreatePost,
  setPreview,
  setToLoadForm,
}: Props) => {
  /**
   * сохранить черновик поста
   */
  async function saveDraftPost() {
    try {
      await db.draftPost.put({
        description: formState.getValues().descriptionPost ?? '',
        id: 1,
        photo: preview.file,
      })
      toast.custom(
        toast => <Toast text={'Post has been saved successfully'} variant={'success'} />,
        {
          duration: 5000,
        }
      )
      clearStatesCreatePost()
      setIsShowModalConfirmCloseModalCreatePost(false)
      formState.reset()
    } catch (error) {
      toast.custom(toast => <Toast text={"Error. Post can't been saved"} variant={'error'} />, {
        duration: 5000,
      })
    }
  }

  /**
   * вытянуть из IndexedDB черновик поста
   */
  const getDraftPost = async () => {
    try {
      const draft = await db.draftPost.get(1) // Здесь 1 — это предполагаемый ID

      if (draft) {
        const previewArray = [] as string[]

        draft.photo.forEach(file => {
          const newPreview = URL.createObjectURL(file)

          previewArray.push(newPreview)
        })

        setPreview({ file: draft.photo, preview: previewArray })
        formState.setValue('descriptionPost', draft.description)
        setToLoadForm(true)
      } else {
        toast.custom(toast => <Toast text={'Draft is empty'} variant={'info'} />, {
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Ошибка при получении черновика:', error)
    }
  }

  return { getDraftPost, saveDraftPost }
}
