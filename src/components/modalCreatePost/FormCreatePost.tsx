import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { FormTextArea } from '@/components/controll/FormTextArea'
import { CreatePostData } from '@/components/modalCreatePost/schema'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/modalCreatePost/modalCreatePost.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  formState: UseFormReturn<CreatePostData>
  submitForm: (data: CreatePostData) => void
  userName: string | undefined
}
export const FormCreatePost = ({ formState, submitForm, userName }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = formState
  /**
   * react hook form
   */
  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  //   watch,
  // } = useForm<CreatePostData>({
  //   mode: 'onChange',
  //   resolver: zodResolver(createPostSchema),
  // })
  /**
   * контроль за данными из поля даты рождения
   */
  const textAreaValue = watch('descriptionPost')

  return (
    <form className={s.form} id={'submitPostForm'} onSubmit={handleSubmit(submitForm)}>
      <div className={s.avaUserNameBlock}>
        <img alt={'ava'} height={36} src={defaultAva.src} width={36} />
        <Typography variant={'h3'}>{userName}</Typography>
      </div>
      <div className={s.textAreaWrapper}>
        <FormTextArea
          className={s.textArea}
          control={control}
          errorMessage={errors.descriptionPost?.message}
          label={'Add publication descriptions'}
          maxLength={500}
          name={'descriptionPost'}
          placeholder={'Description post'}
        />
        <p className={s.countDescriptionPost}>{textAreaValue?.length ?? 0}/500</p>
      </div>
    </form>
  )
}
