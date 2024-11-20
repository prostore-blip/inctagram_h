//todo translation: move inside component and wrap with useMemo?
import { LocaleType } from '@/locales/ru'
import { TabItem } from '@chrizzo/ui-kit'

export const tabsList = (t: LocaleType): TabItem[] => [
  { title: t.profile.settings.generalInformation, value: 'generalInformation' },
  { title: t.profile.settings.devices, value: 'devices' },
  { title: t.profile.settings.accountManagement, value: 'accountManagement' },
  { title: t.profile.settings.myPayments, value: 'myPayments' },
]

export type TabsValue = 'accountManagement' | 'devices' | 'generalInformation' | 'myPayments'
