import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import clsx from 'clsx'
import dayjs, { Dayjs } from 'dayjs'
import Link from 'next/link'
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
  /**
   * хук RTKQ для изменения данных профиля
   */
  const [updateProfile] = useUpdateProfileMutation()
  /**
   * стейт контроля взаимодействия юзера с полем даты рождения. Нужно для
   * разблокировки кнопки "Отправить изменения"
   */
  const [isDirtyBirthDate, setIsDirtyBirthDate] = useState(false)

  /**
   * react hook form
   */
  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValidating },
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm<UserGeneralInfoData>({
    mode: 'onChange',
    resolver: zodResolver(userGeneralInfoSchema),
  })

  /**
   * хук интернационализации
   */
  const { t } = useTranslation()

  /**
   * обработчик формы
   * @param data - данные из формы
   */
  const makeRequest = async (data: any) => {
    /**
     * получаем текущую дату и время и в поле "дата рождения" из формы добавляем время,
     * т.к. на сервер должны идти данные в формате "2024-09-14T15:19:48.060Z",
     * а из формы приходит только дата
     */
    const now = new Date()
    const currentTime = now.toISOString().split('T')[1].split('.')[0] + 'Z'

    data.dateOfBirth = data?.dateOfBirth?.split('.').reverse().join('-') + 'T' + currentTime
    /**
     * разблокируем кнопку отправки изменений
     */
    setIsDirtyBirthDate(false)
    try {
      await updateProfile(data).unwrap()
      /**
       * всплывашка
       */
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
      /**
       * всплывашка
       */
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
  /**
   * условия блокировки кнопки отправки данных. Если есть ошибки в обязательных полях и в поле даты рождения,
   * если идёт процесс отправки, если ввели данные в любое поле формы, если идёт проверка валидации
   */
  const submitDisabled =
    (!isSubmitting && !isDirty && !isValidating && !isDirtyBirthDate) ||
    !!errors.userName ||
    !!errors.lastName ||
    !!errors.firstName ||
    !!errors.dateOfBirth
  /**
   * регистрируем поле "дата рождения"
   */
  const { name } = register('dateOfBirth')
  /**
   * Обработчик изменений календаря
   * @param v - event. Это хитрый объект с типизацией из бибилиотеки dayjs.
   */
  const handleChanges = (v: Dayjs | null) => {
    if (v) {
      /**
       * если объект с данными есть, с помощью метода format (библиотеки dayjs)
       * преобразуем дату в нужный нам формат
       */
      const formattedDate = v.format('DD.MM.YYYY')

      /**
       * передаём дату в форму
       */
      setValue('dateOfBirth', formattedDate)
      /**
       * запускаем валидацию вручную. Если всё хорошо, то сбрасываем стейт
       * взаимодействия юзера с полем даты для блокировки кнопки отправки данных
       */
      trigger('dateOfBirth').then(x => {
        if (x) {
          setIsDirtyBirthDate(true)
        }
      })
    }
  }

  /**
   *это нужно для автоматического заполнения полей формы текущими данными с сервера.
   * Использовать defaultValue в useForm в текущей архитектуре компонента не получилось,
   * т.к. изначально в компонент приходят пустые данные и они идут в defaultValue,
   * а переопределить их потом нельзя
   */
  useEffect(() => {
    if (props.profile) {
      reset({
        aboutMe: props.profile.aboutMe ?? '',
        city: props.profile.city ?? '',
        country: props.profile.country ?? '',
        firstName: props.profile.firstName ?? '',
        lastName: props.profile.lastName ?? '',
        userName: props.profile.userName ?? '',
      })
    }
  }, [props.profile])

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
        <div className={pageStyles.wrapperDatePicker}>
          <Typography className={pageStyles.titleDateOfBirth} variant={'regular14'}>
            {t.profile.settings.birthDate}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={pageStyles.datePicker}
              defaultValue={
                props?.profile?.dateOfBirth
                  ? dayjs(props?.profile?.dateOfBirth?.split('T')[0])
                  : null
              }
              format={'DD.MM.YYYY'}
              name={name}
              onChange={handleChanges}
              slotProps={{ textField: { inputProps: { readOnly: true } } }}
            />
          </LocalizationProvider>
          {errors?.dateOfBirth?.message && (
            <Typography className={pageStyles.titleErrorDateOfBirth} variant={'regular14'}>
              {errors.dateOfBirth.message} <Link href={'/privacyPolicy'}>Privacy Policy</Link>
            </Typography>
          )}
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
          {t.profile.settings.saveChangeButton}
        </Button>
      </form>
    </>
  )
}
