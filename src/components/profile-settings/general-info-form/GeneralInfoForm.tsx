import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Close } from '@/assets/icons/close'
import { FormTextArea } from '@/components/controll/FormTextArea'
import { Toast } from '@/components/profile-settings'
import { DatePIckerForProfileSettings } from '@/components/profile-settings/general-info-form/DatePIckerForProfileSettings'
import { FormInputGroup } from '@/components/profile-settings/general-info-form/FormInputGroup'
import { SelectBlock } from '@/components/profile-settings/general-info-form/SelectBlock'
import {
  UserGeneralInfoData,
  userGeneralInfoSchema,
} from '@/components/profile-settings/general-info-form/schema'
import { useTranslation } from '@/hooks/useTranslation'
import { ResponseDataUserProfile } from '@/pages/profile/types'
import { useUpdateProfileMutation } from '@/services/inctagram.profile.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'sonner'

import pageStyles from '@/pages/generalInfo/page.module.scss'

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
    getValues,
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
  const { router, t } = useTranslation()

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
      localStorage.removeItem('settingProfile')
      /**
       * всплывашка
       */
      toast.custom(jsx => <Toast jsx={jsx} title={t.profile.settings.toast.success} />, {
        className: pageStyles.succesToast,
        duration: Infinity,
      })
    } catch (error) {
      //todo set fields errors
      /**
       * всплывашка
       */
      toast.custom(jsx => <Toast jsx={jsx} title={t.profile.settings.toast.error} />, {
        className: pageStyles.errorToast,
      })
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

      localStorage.setItem('dataOfBirth', formattedDate)
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
   * обработчик навигации на страницу политики.
   * Сохраняем в локалстрэдже данные из формы. Это нужно, если мы со страницы политики вернёмся
   * назад на setting, то из сторэйджа подтянем данные и засунем их в поля формы. Так по ТЗ
   */
  const toPrivacyPolity = () => {
    const getValuesForm = getValues()

    localStorage.setItem('settingProfile', JSON.stringify(getValuesForm))

    void router.push('/privacyPolicy')
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

  /**
   * вытягиваем из локалсторэйджа данные и сетаем их в поля формы. Это нужно, если мы со страницы
   * политики вернулись назад на setting, то в форме должны быть ранее введённые данные. Так по ТЗ
   */

  useEffect(() => {
    const savedDataFromForm = localStorage.getItem('settingProfile')

    if (savedDataFromForm) {
      const parsedSavedDataFromForm = JSON.parse(savedDataFromForm)

      reset(parsedSavedDataFromForm)
    }
  }, [])
  /**
   * Это логика передачи в Календарь дефолтного значения даты. При первом рендере данные будут из пропсов.
   * Если ввели невалидную дату и потом перешли на страницу политики, то по возврату на страницу setting,
   * мы долджны в каледарь передать ранее введённое значение. Берём его из локалсторэйджа. Если нет ни того,
   * ни другого, то передаём null
   */
  const getDataBirthFromStorage = localStorage.getItem('dataOfBirth')

  let defaultDateBirth

  if (getDataBirthFromStorage) {
    defaultDateBirth = dayjs(getDataBirthFromStorage.split('.').reverse().join('-'))
  } else if (props.profile?.dateOfBirth) {
    defaultDateBirth = dayjs(props?.profile?.dateOfBirth?.split('T')[0])
  } else {
    defaultDateBirth = null
  }

  return (
    <>
      <DevTool control={control} />
      <form className={pageStyles.form} onSubmit={handleSubmit(makeRequest)}>
        <FormInputGroup control={control} errors={errors} />
        <DatePIckerForProfileSettings
          defaultValue={defaultDateBirth}
          errors={errors}
          name={name}
          onChange={handleChanges}
          onClick={toPrivacyPolity}
        />
        <SelectBlock control={control} />
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
