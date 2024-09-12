import { MouseEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Calendar } from '@/assets/icons/calendar'
import { Close } from '@/assets/icons/close'
import { FormSelect } from '@/components/controll/FormSelect'
import { FormTextArea } from '@/components/controll/FormTextArea'
import { FormInput } from '@/components/controll/formTextField'
import {
  UserGeneralInfoData,
  userGeneralInfoSchema,
} from '@/components/profile-settings/general-info-form/schema'
import { SelectItem } from '@/components/uikit-temp-replacements/select/Select'
import { useTranslation } from '@/hooks/useTranslation'
import { ResponseDataUserProfile } from '@/pages/profile/types'
import { useUpdateProfileMutation } from '@/services/inctagram.profile.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { toast } from 'sonner'

import pageStyles from '@/pages/generalInfo/page.module.scss'

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

type Props = {
  profile: ResponseDataUserProfile | undefined
}

export function GeneralInfoForm(props: Props) {
  //todo props or hook?
  const [updateProfile, { error, isError, isLoading, isSuccess }] = useUpdateProfileMutation()

  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid, isValidating, validatingFields },
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm<UserGeneralInfoData>({
    defaultValues: {
      aboutMe: props?.profile?.aboutMe ?? '',
      city: props?.profile?.city ?? '',
      country: props?.profile?.country ?? '',
      dateOfBirth: props?.profile?.dateOfBirth?.split('T')[0].split('-').reverse().join('.') ?? '',
      firstName: props?.profile?.firstName ?? '',
      lastName: props?.profile?.lastName ?? '',
      userName: props?.profile?.userName ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(userGeneralInfoSchema),
  })
  const { router, t } = useTranslation()
  const makeRequest = async (data: any) => {
    const now = new Date()
    const currentTime = now.toISOString().split('T')[1].split('.')[0] + 'Z'

    data.dateOfBirth = data.dateOfBirth.split('.').reverse().join('-') + 'T' + currentTime

    try {
      await updateProfile(data).unwrap()
      toast.custom(
        t => (
          <div className={pageStyles.toastWrapper}>
            <Typography variant={'regular16'}>Your settings are saved</Typography>{' '}
            <Button className={pageStyles.close} onClick={() => toast.dismiss(t)} variant={'text'}>
              <Close />
            </Button>
          </div>
        ),
        {
          className: pageStyles.succesToast,
          duration: Infinity,
        }
      )
    } catch (error) {
      //todo set fields errors
      toast.custom(
        t => (
          <div className={pageStyles.toastWrapper}>
            <Typography variant={'regular16'}>Error! Server is not available</Typography>{' '}
            <Button className={pageStyles.close} onClick={() => toast.dismiss(t)} variant={'text'}>
              <Close />
            </Button>
          </div>
        ),
        {
          className: pageStyles.errorToast,
        }
      )
    }
  }
  const submitDisabled = isSubmitting || !isDirty || isValidating || !isValid

  const ref = useRef<HTMLInputElement | null>(null)
  const handleFocus = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (ref.current) {
      ref.current.showPicker()
    }
  }
  const handleChanges = () => {
    if (ref.current) {
      if (ref.current.value) {
        const dateToISO = ref.current.value.split('-').reverse().join('.')

        setValue('dateOfBirth', dateToISO)
        void trigger('dateOfBirth')
      }
    }
  }

  return (
    <>
      <DevTool control={control} />
      <form className={pageStyles.form} onSubmit={handleSubmit(makeRequest)}>
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
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <FormInput
            className={clsx(pageStyles.formItem, pageStyles.birthInput)}
            control={control}
            label={'Date Of Birth'}
            name={'dateOfBirth'}
            readOnly
          />
          <label htmlFor={'dateBirth'}>
            <Calendar />
          </label>
          <input
            className={pageStyles.dateInput}
            id={'dateBirth'}
            lang={router.locale}
            onChange={handleChanges}
            onClick={handleFocus}
            ref={ref}
            type={'date'}
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
          name={'aboutMe'}
          placeholder={t.profile.settings.aboutMePlaceholder}
        />

        <Button className={pageStyles.submitButton} disabled={submitDisabled} type={'submit'}>
          Save changes
        </Button>
      </form>
    </>
  )
}
