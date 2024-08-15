import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageIcon } from '@/assets/icons'
import { GetNavLayout } from '@/components'
import { FormSelect } from '@/components/controll/formSelect'
import { FormInput } from '@/components/controll/formTextField'
import { Select, SelectItem } from '@/components/uikit-temp-replacements/select/Select'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, TabType, TextArea, Typography } from '@chrizzo/ui-kit'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { z } from 'zod'

import pageStyles from './page.module.scss'
import tabsStyles from './tabs.module.scss'

const tabsList: TabType[] = [
  { title: 'General information', value: 'general' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account management', value: 'management' },
  { title: 'My payments', value: 'payments' },
]

// const countries = [{ item: 'Country1' }, { item: 'Country2' }, { item: 'Country3' }]
const countries = [
  { title: 'Country1', value: 'country1' },
  { title: 'Country2', value: 'country2' },
  { title: 'Country3', value: 'country3' },
]

// const cities = [{ item: 'City1',  }, { item: 'City1' }, { item: 'City1' }]
const cities = [
  { title: 'City1', value: 'city1' },
  { title: 'City2', value: 'city2' },
  { title: 'City3', value: 'city3' },
]

const userGeneralInfoSchema = z.object({
  aboutMe: z.string().min(3),
  birthDate: z.date(),
  city: z.string().min(3),
  country: z.string().min(3),
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  username: z.string().min(3),
})

// .refine(data => data.password === data.confirmPassword, {
//   message: 'Passwords do not match',
//   path: ['confirmPassword'],
// })
export type UserGeneralInfoData = z.infer<typeof userGeneralInfoSchema>

const Page = () => {
  const {
    control,
    formState: { errors },

    handleSubmit,
  } = useForm<UserGeneralInfoData>({ resolver: zodResolver(userGeneralInfoSchema) })
  const [currentTab, setCurrentTab] = useState(tabsList[0].value)

  const onHandleSubmit = handleSubmit(data => {})

  const { t } = useTranslation()

  return (
    <div className={tabsStyles.wrapper} style={{ padding: '50px' }}>
      <TabsPrimitive.Tabs
        activationMode={'manual'}
        onValueChange={setCurrentTab}
        value={currentTab}
      >
        <TabsPrimitive.TabsList className={tabsStyles.tabsList}>
          {tabsList.map((item, _idx) => (
            <TabsPrimitive.TabsTrigger
              className={tabsStyles.tabsTrigger}
              disabled={item.value === tabsList[1].value}
              key={item.title + item.value}
              value={item.value}
            >
              {item.title}
            </TabsPrimitive.TabsTrigger>
          ))}
        </TabsPrimitive.TabsList>
      </TabsPrimitive.Tabs>
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: '36px',
          justifyContent: 'flex-start',
          marginTop: '24px',
        }}
      >
        <div
          style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div
            style={{
              alignItems: 'center',
              backgroundColor: 'var(--color-dark-500)',
              borderRadius: '50%',
              display: 'flex',
              height: '192px',
              justifyContent: 'center',
              width: '192px',
            }}
          >
            <ImageIcon size={36} />
          </div>
          <Button type={'button'} variant={'outline'}>
            Add profile photo
          </Button>
        </div>
        <div style={{ flexGrow: '1' }}>
          <DevTool control={control} />
          <form
            action={''}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FormInput
              control={control}
              error={errors.username?.message}
              label={t.signUp.userName}
              name={'username'}
              placeholder={'username'}
              style={{ marginBottom: '24px' }}
            />
            <FormInput
              control={control}
              error={errors.firstname?.message}
              label={t.signUp.userName}
              name={'firstname'}
              placeholder={'firstname'}
              style={{ marginBottom: '24px' }}
            />
            <FormInput
              control={control}
              error={errors.lastname?.message}
              label={t.signUp.userName}
              name={'lastname'}
              placeholder={'lastname'}
              style={{ marginBottom: '24px' }}
            />
            <FormInput
              control={control}
              error={errors.lastname?.message}
              label={'Date of birth'}
              name={'birthDate'}
              placeholder={'birthDate'}
              style={{ marginBottom: '24px' }}
            />
            <section
              className={pageStyles.locationSection}
              style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'space-between',
                marginBottom: '24px',
                width: '100%',
              }}
            >
              {/*<Select fullWidth label={'Select your country'} placeholder={'Country'}>*/}
              {/*  {countries.map(item => (*/}
              {/*    <SelectItem key={item.value + item.title} value={item.value}>*/}
              {/*      {item.title}*/}
              {/*    </SelectItem>*/}
              {/*  ))}*/}
              {/*</Select>*/}
              <FormSelect
                control={control}
                fullWidth
                label={'Select your country'}
                name={'country'}
                placeholder={'Country'}
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
                label={'Select your city'}
                name={'city'}
                placeholder={'City'}
              >
                {cities.map(item => (
                  <SelectItem key={item.value + item.title} value={item.value}>
                    {item.title}
                  </SelectItem>
                ))}
              </FormSelect>
            </section>
            <section style={{ marginBottom: '48px', width: '100%' }}>
              <Typography className={pageStyles.label} variant={'regular14'}>
                About me
              </Typography>
              <TextArea
                name={'aboutMe'}
                placeholder={'about'}
                style={{ height: '100px', width: '100%' }}
              ></TextArea>
            </section>

            <Button style={{ alignSelf: 'flex-end' }} type={'submit'}>
              Save changes
            </Button>
          </form>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#333333',
          bottom: '62px',
          height: '2px',
          position: 'relative',
          width: '100%',
        }}
      />
    </div>
  )
}

Page.getLayout = GetNavLayout
export default Page
