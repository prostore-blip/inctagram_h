import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

import { FormSelect } from '@/components/controll/FormSelect'
import { FormTextArea } from '@/components/controll/FormTextArea'
import { FormInput } from '@/components/controll/formTextField'
import {
  UserGeneralInfoData,
  userGeneralInfoSchema,
} from '@/components/profile-settings/general-info-form/schema'
import { SelectItem } from '@/components/uikit-temp-replacements/select/Select'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/inctagram.auth.service'
import { useUpdateProfileMutation } from '@/services/inctagram.profile.service'
import { Button } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import pageStyles from '@/pages/profile/settings/page.module.scss'

const countries = [
  { title: 'Country1', value: 'country1' },
  { title: 'Country2', value: 'country2' },
  { title: 'Country3', value: 'country3' },
  { title: 'DemoCountry', value: 'DemoCountry' },
]

const cities = [
  { title: 'City1', value: 'city1' },
  { title: 'City2', value: 'city2' },
  { title: 'City3', value: 'city3' },
  { title: 'DemoCity', value: 'DemoCity' },
]

export function ProfileForm() {
  //todo props or hook?
  const [updateProfile, { error, isError, isLoading, isSuccess }] = useUpdateProfileMutation()

  const { data } = useMeQuery()

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValidating },
    handleSubmit,
    setValue,
    trigger,
  } = useForm<UserGeneralInfoData>({
    defaultValues: {
      about: data?.meta.about || '',
      birthday: data?.meta.birthday || '',
      city: data?.meta.city || '',
      country: data?.meta.country || '',
      login: data?.providers[0].login || '',
      name: data?.meta.name || '',
      surname: data?.meta.surname || '',
    },
    mode: 'onTouched',
    resolver: zodResolver(userGeneralInfoSchema),
  })

  const { router, t } = useTranslation()

  const makeRequest = handleSubmit(async data => {
    try {
      await updateProfile(data).unwrap()
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
    setValue('birthday', `${day}.${month}.${year}`)
    await trigger('birthday')
  }

  const submitDisabled = isSubmitting || !isDirty || isValidating

  return (
    <>
      <DevTool control={control} />
      <form className={pageStyles.form} onSubmit={makeRequest}>
        <FormInput
          className={pageStyles.formItem}
          control={control}
          error={errors.login?.message}
          label={t.common.username}
          name={'login'}
        />
        <FormInput
          className={pageStyles.formItem}
          control={control}
          error={errors.name?.message}
          label={t.common.firstName}
          name={'name'}
        />
        <FormInput
          className={pageStyles.formItem}
          control={control}
          error={errors.surname?.message}
          label={t.common.lastName}
          name={'surname'}
        />
        <div style={{ position: 'relative' }}>
          <input
            className={pageStyles.dateInput}
            lang={router.locale}
            onChange={handleDateChange}
            type={'date'}
          />
          <FormInput
            className={pageStyles.formItem}
            control={control}
            error={errors.birthday?.message}
            label={t.profile.settings.birthDate}
            name={'birthday'}
            placeholder={t.profile.settings.birthDatePlaceholder}
          />
        </div>
        <section className={clsx(pageStyles.locationSection, pageStyles.formItem)}>
          <FormSelect
            control={control}
            fullWidth
            label={t.profile.settings.selectYourCountry}
            name={'country'}
            placeholder={t.profile.settings.selectYourCountryPlaceholder}
          >
            {countries.map(item => (
              <SelectItem key={item.value + item.title} value={item.value}>
                {item.title}
              </SelectItem>
            ))}
          </FormSelect>
          <FormSelect
            control={control}
            fullWidth
            label={t.profile.settings.selectYourCity}
            name={'city'}
            placeholder={t.profile.settings.selectYourCityPlaceholder}
          >
            {cities.map(item => (
              <SelectItem key={item.value + item.title} value={item.value}>
                {item.title}
              </SelectItem>
            ))}
          </FormSelect>
        </section>
        <FormTextArea
          className={pageStyles.aboutMe}
          control={control}
          label={t.profile.settings.aboutMe}
          name={'about'}
          placeholder={t.profile.settings.aboutMePlaceholder}
        />

        <Button className={pageStyles.submitButton} disabled={submitDisabled} type={'submit'}>
          Save changes
        </Button>
      </form>
    </>
  )
}
