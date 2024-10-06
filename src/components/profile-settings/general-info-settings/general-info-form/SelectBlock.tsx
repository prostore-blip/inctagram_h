import { Control } from 'react-hook-form'

import { FormSelect } from '@/components/controll/FormSelect'
import { UserGeneralInfoData } from '@/components/profile-settings/general-info-settings/general-info-form/schema'
import { SelectItem } from '@/components/uikit-temp-replacements/select/Select'
import { useTranslation } from '@/hooks/useTranslation'
import clsx from 'clsx'

import pageStyles from './form.module.scss'

export const countries = [
  { title: 'Country1', value: 'country1' },
  { title: 'Country2', value: 'country2' },
  { title: 'Country3', value: 'country3' },
  { title: 'DemoCountry', value: 'DemoCountry' },
]
export const cities = [
  { title: 'City1', value: 'city1' },
  { title: 'City2', value: 'city2' },
  { title: 'City3', value: 'city3' },
  { title: 'DemoCity', value: 'DemoCity' },
]
type SelectBlockProps = {
  control: Control<UserGeneralInfoData>
}
export const SelectBlock = ({ control }: SelectBlockProps) => {
  /**
   * хук интернационализации
   */
  const { t } = useTranslation()

  return (
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
  )
}
