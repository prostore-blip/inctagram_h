import { useState } from 'react'

import { GetNavLayout } from '@/components'
import { GeneralInfoForm } from '@/components/profile-settings'
import { AvatarSelector } from '@/components/uikit-temp-replacements/avatar/AvatarSelector'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/inctagram.auth.service'
import { TabType } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import pageStyles from './page.module.scss'
import tabsStyles from './tabs.module.scss'

//todo translation: move inside component and wrap with useMemo?
const tabsList: TabType[] = [
  { title: 'General information', value: 'generalInformation' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account management', value: 'accountManagement' },
  { title: 'My payments', value: 'myPayments' },
]

const Page = () => {
  //todo what is better for a form: props (defaultValues, submit function) or rtk-query hook?

  const { data } = useMeQuery()

  const [currentTab, setCurrentTab] = useState(tabsList[0].value)

  const { router, t } = useTranslation()

  const [image, setImage] = useState<File | null>(null)

  const handleImageSelection = (file: File | null) => {
    //todo call mutation hook
    setImage(file)
  }

  return (
    <div className={pageStyles.wrapper}>
      <TabsPrimitive.Root
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
              {t.profile.settings[item.value] || item.title}
            </TabsPrimitive.TabsTrigger>
          ))}
        </TabsPrimitive.TabsList>
      </TabsPrimitive.Root>
      <div className={pageStyles.flexRow}>
        <AvatarSelector initialValue={data?.meta.avatar} onValueChange={handleImageSelection} />
        <GeneralInfoForm />
      </div>
      <div className={pageStyles.separator} />
    </div>
  )
}

Page.getLayout = GetNavLayout
export default Page
