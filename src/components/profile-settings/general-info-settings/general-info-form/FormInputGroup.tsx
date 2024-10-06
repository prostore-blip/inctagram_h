import { Control, FieldErrors } from 'react-hook-form'

import { FormInput } from '@/components/controll/formTextField'
import { UserGeneralInfoData } from '@/components/profile-settings/general-info-settings/general-info-form/schema'
import { useTranslation } from '@/hooks/useTranslation'

import pageStyles from './form.module.scss'

type Props = {
  control: Control<UserGeneralInfoData>
  errors: FieldErrors<UserGeneralInfoData>
}
export const FormInputGroup = ({ control, errors }: Props) => {
  /**
   * хук интернационализации
   */
  const { t } = useTranslation()

  return (
    <>
      <FormInput
        className={pageStyles.formItem}
        control={control}
        error={errors.userName?.message}
        label={t.common.username}
        name={'userName'}
      />
      <FormInput
        className={pageStyles.formItem}
        control={control}
        error={errors.firstName?.message}
        label={t.common.firstName}
        name={'firstName'}
      />
      <FormInput
        className={pageStyles.formItem}
        control={control}
        error={errors.lastName?.message}
        label={t.common.lastName}
        name={'lastName'}
      />
    </>
  )
}
