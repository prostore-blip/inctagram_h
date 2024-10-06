import { useTranslation } from '@/hooks/useTranslation'
import { TabType } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import tabsStyles from '@/components/profile-settings/tabs-trigger-list/tabs.module.scss'

type Propss = {
  tabsList: TabType[]
}
export const TabsTriggerslist = ({ tabsList }: Propss) => {
  /**
   * интернационализация
   */
  const { t } = useTranslation()
  /**
   * утилита для интернационализации имени табов
   * @param value
   */
  const getTabName = (value: string) => {
    const key = value as keyof Omit<typeof t.profile.settings, 'toast'>

    return t.profile.settings[key]
  }

  return (
    <TabsPrimitive.TabsList className={tabsStyles.tabsList}>
      {tabsList.map((item, _idx) => (
        <TabsPrimitive.TabsTrigger
          className={tabsStyles.tabsTrigger}
          // disabled={item.value === tabsList[1].value}
          key={item.title + item.value}
          value={item.value}
        >
          {getTabName(item.value) || item.title}
        </TabsPrimitive.TabsTrigger>
      ))}
    </TabsPrimitive.TabsList>
  )
}
