import { FieldErrors } from 'react-hook-form'

import { UserGeneralInfoData } from '@/components/profile-settings/general-info-settings/general-info-form/schema'
import { useTranslation } from '@/hooks/useTranslation'
import { Typography } from '@chrizzo/ui-kit'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'

import pageStyles from './form.module.scss'

type Props = {
  defaultValue: dayjs.Dayjs | null
  errors: FieldErrors<UserGeneralInfoData>
  name: string
  onChange: (v: Dayjs | null) => void
  onClick: () => void
}
export const DatePIckerForProfileSettings = ({
  defaultValue,
  errors,
  name,
  onChange,
  onClick,
}: Props) => {
  /**
   * хук интернационализации
   */
  const { t } = useTranslation()

  return (
    <div className={pageStyles.wrapperDatePicker}>
      <Typography className={pageStyles.titleDateOfBirth} variant={'regular14'}>
        {t.profile.settings.birthDate}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={pageStyles.datePicker}
          defaultValue={defaultValue}
          format={'DD.MM.YYYY'}
          name={name}
          onChange={onChange}
          slotProps={{ textField: { inputProps: { readOnly: true } } }}
        />
      </LocalizationProvider>
      {errors?.dateOfBirth?.message && (
        <Typography className={pageStyles.titleErrorDateOfBirth} variant={'regular14'}>
          {errors.dateOfBirth.message}
          <span onClick={onClick}>Privacy Policy</span>
        </Typography>
      )}
    </div>
  )
}
