import React, { useState } from 'react'

import { MyPaymentsContent } from '@/components/profile-settings/MyPaymentsTable/MyPaymentsContent'
import { AccountManagmentContent } from '@/components/profile-settings/account-managment'
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
import { useRouter } from 'next/router'

import s from '@/components/profile-settings/profileSettings.module.scss'

//todo translation: move inside component and wrap with useMemo?
const tabsList: TabType[] = [
  { title: 'General information', value: 'generalInformation' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account management', value: 'accountManagement' },
  { title: 'My payments', value: 'myPayments' },
]

export const ProfileSettings = () => {
  const router = useRouter()
  /**
   * запрос за данными моего профайла для отображения их в форме generalInfo
   */
  const { data, isFetching } = useGetMyProfileQuery()
  /**
   * запрос за изменением аватарки профиля
   */
  const [updateAvatarProfile] = useUpdateAvatarProfileMutation()
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
  /**
   * функция изменения динамического сегмента URL. После изменения URL компонент ререндерится
   * и новый сегмент из router.query идёт в value TabsPrimitive.Root.
   * Такая логика мне нужна для работы с оплатой через сторонний сервис: мне придёт от сервиса
   * URL "generalInfo/accountManagement", я вытяну "accountManagement" и сработает Таба для "accountManagement".
   * Для переключения табов можно было бы использовать useState, а при получении URLот платёжного сервиса
   * использовать useEffect, но тогда были бы мерцания.
   * @param value - значение Tab, на которое переключились
   */
  const changeUrl = (value: string) => {
    void router.push(`${value}`)
  }

  return (
    <div className={s.wrapper}>
      <LinearProgress active={isFetching} thickness={3} />
      <TabsPrimitive.Root
        activationMode={'manual'}
        onValueChange={changeUrl}
        value={router.query.index as string}
      >
        <TabsTriggerslist tabsList={tabsList} />
        <GeneralInfoContent
          isFetching={isFetching}
          onValueChange={handleImageSelection}
          profileData={data}
        />
        <DevicesSessionsContent />
        <AccountManagmentContent />
        <MyPaymentsContent />
      </TabsPrimitive.Root>
    </div>
  )
}
