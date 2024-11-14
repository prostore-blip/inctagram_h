import { ChangeEvent, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { logInSchema } from '@/components/auth/sign-in/logIn-schema'
import { FormSelect } from '@/components/controll/FormSelect'
import { FormTextArea } from '@/components/controll/FormTextArea'
import { FormInput } from '@/components/controll/formTextField'
import { useTranslation } from '@/hooks/useTranslation'
import { ProfileDataType } from '@/services/incta-team-api/profile/types'
import { Button } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './generalInfoForm.module.scss'

import { UserGeneralInfoData, userGeneralInfoSchema } from './schema'

//todo find an api for this
const countries = [
  { item: 'Country1' },
  { item: 'Country2' },
  { item: 'Country3' },
  { item: 'DemoCountry' },
]

const cities = [{ item: 'City1' }, { item: 'City2' }, { item: 'City3' }, { item: 'DemoCity' }]

type ProfileGeneralInfoFormProps = {
  initialData?: Partial<ProfileDataType>
  onSubmit: (data: UserGeneralInfoData) => Promise<void>
}

export function GeneralInfoForm({ initialData, onSubmit }: ProfileGeneralInfoFormProps) {
  const { router, t } = useTranslation()

  const formSchema = useMemo(() => userGeneralInfoSchema(t), [router?.locale])

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValidating },
    handleSubmit,
    setValue,
    trigger,
  } = useForm<UserGeneralInfoData>({
    defaultValues: {
      about: initialData?.about || '',
      city: initialData?.location?.city || '',
      country: initialData?.location?.country || '',
      dateOfBirth: initialData?.birthDate || '',
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      userName: initialData?.userName || '',
    },
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  })

  const makeRequest = handleSubmit(async data => {
    try {
      await onSubmit(data)
    } catch (error) {
      //todo set fields errors
      console.log(error)
    }
  })

  const handleDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value
    // const date = new Date(dateString)
    const dateParts = dateString.split('-')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]

    // todo api should accept format dd.mm.YYYY or probably we could add one hidden field for submit and one for display
    setValue('dateOfBirth', `${day}.${month}.${year}`)
    await trigger('dateOfBirth')
  }

  const submitDisabled = isSubmitting || !isDirty || isValidating

  return (
    <>
      <DevTool control={control} />
      <form className={s.form} onSubmit={makeRequest}>
        <FormInput
          className={s.formItem}
          control={control}
          error={errors.userName?.message}
          label={t.common.accountName}
          name={'userName'}
        />
        <FormInput
          className={s.formItem}
          control={control}
          error={errors.firstName?.message}
          label={t.common.firstName}
          name={'firstName'}
        />
        <FormInput
          className={s.formItem}
          control={control}
          error={errors.lastName?.message}
          label={t.common.lastName}
          name={'lastName'}
        />
        <div style={{ position: 'relative' }}>
          <input
            className={s.dateInput}
            lang={router.locale}
            onChange={handleDateChange}
            type={'date'}
          />
          <FormInput
            className={s.formItem}
            control={control}
            error={errors.dateOfBirth?.message}
            label={t.profile.settings.birthDate}
            name={'dateOfBirth'}
            placeholder={t.profile.settings.birthDatePlaceholder}
          />
        </div>
        <section className={clsx(s.locationSection, s.formItem)}>
          <div className={s.locationSelectWrapper}>
            <FormSelect
              className={s.locationSelect}
              control={control}
              fullWidth
              items={countries}
              label={t.profile.settings.selectYourCountry}
              name={'country'}
              placeholder={t.profile.settings.selectYourCountryPlaceholder}
            />
          </div>
          <div className={s.locationSelectWrapper}>
            <FormSelect
              className={s.locationSelect}
              control={control}
              fullWidth
              items={cities}
              label={t.profile.settings.selectYourCity}
              name={'city'}
              placeholder={t.profile.settings.selectYourCityPlaceholder}
            />
          </div>
        </section>
        <FormTextArea
          className={s.aboutMe}
          control={control}
          label={t.profile.settings.aboutMe}
          name={'about'}
          placeholder={t.profile.settings.aboutMePlaceholder}
        />

        <Button className={s.submitButton} disabled={submitDisabled} type={'submit'}>
          Save changes
        </Button>
      </form>
    </>
  )
}
