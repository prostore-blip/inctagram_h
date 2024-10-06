import React, { useState } from 'react'

import { DevicesSessionsContent } from '@/components/profile-settings/devices'
import { GeneralInfoContent } from '@/components/profile-settings/general-info-settings'
import { TabsTriggerslist } from '@/components/profile-settings/tabs-trigger-list'
import LinearProgress from '@/components/uikit-temp-replacements/linear-progress/LinearProgress'
import {
  useGetMyProfileQuery,
  useUpdateAvatarProfileMutation,
} from '@/services/inctagram.profile.service'
import { TabType } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from '@/components/profile-settings/profileSettings.module.scss'

//todo translation: move inside component and wrap with useMemo?
const tabsList: TabType[] = [
  { title: 'General information', value: 'generalInformation' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account management', value: 'accountManagement' },
  { title: 'My payments', value: 'myPayments' },
]

export const ProfileSettings = () => {
  /**
   * запрос за данными моего профайла для отображения их в форме generalInfo
   */
  const { data, isFetching } = useGetMyProfileQuery()
  /**
   * запрос за изменением аватарки профиля
   */
  const [updateAvatarProfile] = useUpdateAvatarProfileMutation()
  /**
   * стейт переключения табов
   */
  const [currentTab, setCurrentTab] = useState(tabsList[0].value)
  /**
   * стейт картинки аватарки. Зачем он нужен, не знаю. Делал Саша.
   */
  const [_, setImage] = useState<File | null>(null)
  /**
   * обработчик загрузки аватарки с Пк и отправки её на сервер
   * @param file - загруженный файл
   */
  const handleImageSelection = (file: File | null) => {
    if (file) {
      const formData = new FormData()

      setImage(file)
      formData.append('file', file)
      updateAvatarProfile({ file: formData })
    }
  }

  return (
    <div className={s.wrapper}>
      <LinearProgress active={isFetching} thickness={3} />
      <TabsPrimitive.Root
        activationMode={'manual'}
        onValueChange={setCurrentTab}
        value={currentTab}
      >
        <TabsTriggerslist tabsList={tabsList} />
        <GeneralInfoContent
          isFetching={isFetching}
          onValueChange={handleImageSelection}
          profileData={data}
        />
        <DevicesSessionsContent />
      </TabsPrimitive.Root>
      <div className={s.separator} />
    </div>
  )
}
