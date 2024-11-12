import React, { ChangeEvent, Dispatch, SetStateAction, forwardRef } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { CarouselCreatePost } from '@/components/modalCreatePost/CarouselCreatePost'
import { FormCreatePost } from '@/components/modalCreatePost/FormCreatePost'
import { LoadImageFromPCBlock } from '@/components/modalCreatePost/LoadImageFromPCBlock'
import { CreatePostData } from '@/components/modalCreatePost/schema'
import { Card } from '@chrizzo/ui-kit'

import s from '@/components/modalCreatePost/modalCreatePost.module.scss'

type Props = {
  carouselArray: { id: number; url: string }[]
  formState: UseFormReturn<CreatePostData>
  getDraftPost: () => void
  imageError: string
  imageSelectHandler: (e: ChangeEvent<HTMLInputElement>) => void
  isPreview: boolean
  loadedFiles: File[]
  setIsDIsabledNextButton: Dispatch<SetStateAction<boolean>>
  setPreview: Dispatch<SetStateAction<{ file: File[]; preview: string[] }>>
  submitFormHandler: (data: CreatePostData) => void
  toLoadForm: boolean
  toLoadImages: boolean
  triggerFileInputHandler: () => void
  userName: string
}
export const HeaderBody = forwardRef<unknown, Props>(
  (
    {
      carouselArray,
      formState,
      getDraftPost,
      imageError,
      imageSelectHandler,
      isPreview,
      loadedFiles,
      setIsDIsabledNextButton,
      setPreview,
      submitFormHandler,
      toLoadForm,
      toLoadImages,
      triggerFileInputHandler,
      userName,
    },
    ref
  ) => {
    return (
      <div style={{ height: 'calc(100% - 61px)', position: 'relative' }}>
        <LoadImageFromPCBlock
          getDraftPost={getDraftPost}
          imageError={imageError}
          isPreview={isPreview}
          onChange={imageSelectHandler}
          ref={ref}
          triggerFileInput={triggerFileInputHandler}
        />
        {isPreview && (
          <Card className={s.cardPost} variant={'dark300'}>
            {(toLoadImages || toLoadForm) && (
              <CarouselCreatePost
                imagesPost={carouselArray}
                loadedFiles={loadedFiles}
                setDisabledNextButton={setIsDIsabledNextButton}
                setFile={setPreview}
                toLoadForm={toLoadForm}
                toLoadImages={toLoadImages}
              />
            )}
            {toLoadForm && (
              <FormCreatePost
                formState={formState}
                submitForm={submitFormHandler}
                userName={userName}
              />
            )}
          </Card>
        )}
      </div>
    )
  }
)
