import { useState } from 'react'

import { Chrome, LogOut, Mobile } from '@/assets/icons'
import { Decstop } from '@/assets/icons/decstop'
import { GetLayout, PageWrapper } from '@/components'
import { ModalConfirmLogout } from '@/components/modalConfirmLogout'
import { GeneralInfoForm } from '@/components/profile-settings'
import { AvatarSelector } from '@/components/uikit-temp-replacements/avatar/AvatarSelector'
import LinearProgress from '@/components/uikit-temp-replacements/linear-progress/LinearProgress'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useGetMyProfileQuery,
  useUpdateAvatarProfileMutation,
} from '@/services/inctagram.profile.service'
import { useGetAllSessionsQuery } from '@/services/inctagram.sessions.service'
import { Button, TabType, Typography } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'

import st from '@/pages/generalInfo/logoutConfirm.module.scss'
import s from '@/pages/generalInfo/page.module.scss'
import tabsStyles from '@/pages/generalInfo/tabs.module.scss'

import { useAppSelector } from '../../../store'

//todo translation: move inside component and wrap with useMemo?
const tabsList: TabType[] = [
  { title: 'General information', value: 'generalInformation' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account management', value: 'accountManagement' },
  { title: 'My payments', value: 'myPayments' },
]

export function GeneralInfo() {
  const { data, isFetching } = useGetMyProfileQuery()
  const myEmail = useAppSelector(state => state.auth.authData.myEmail)
  const [updateAvatarProfile] = useUpdateAvatarProfileMutation()

  const [currentTab, setCurrentTab] = useState(tabsList[0].value)

  const { t } = useTranslation()

  const [_, setImage] = useState<File | null>(null)

  const handleImageSelection = (file: File | null) => {
    //todo call mutation hook

    if (file) {
      const formData = new FormData()

      setImage(file)
      formData.append('file', file)
      updateAvatarProfile({ file: formData })
    }
  }

  const getTabName = (value: string) => {
    const key = value as keyof Omit<typeof t.profile.settings, 'toast'>

    return t.profile.settings[key]
  }
  /**
   * Запрос за текущей и активными сессиями
   */
  const { data: sessions } = useGetAllSessionsQuery()
  /**
   * массив активных сессий
   */
  const otherSessions = sessions?.others.map(device => {
    return (
      <li className={s.device} key={device.deviceId}>
        {device.osName === 'Windows' ? <Decstop /> : <Mobile />}
        <div className={s.deviceTypeAndIP}>
          <Typography variant={'regularBold16'}>Apple iMac 27</Typography>
          <Typography variant={'regular14'}>IP:{device.ip}</Typography>
          <Typography variant={'small'}>Last visit:{device.lastActive}</Typography>
        </div>
        <div className={s.logoutButtonWr}>
          <ModalConfirmLogout
            callback={() => {}}
            title={'Log Out'}
            variantTriggerButton={
              <Button
                as={'button'}
                className={clsx(st.wrapper)}
                // onClick={() => handleClick(link.isButton, link.name)}
                variant={'text'}
              >
                <LogOut />
                <Typography as={'span'} variant={'regularMedium14'}>
                  Log Out
                </Typography>
              </Button>
            }
          >
            <Typography as={'span'} className={st.questionConfirm} variant={'regular16'}>
              Are you really want to log out of your account &quot;
              <Typography as={'span'} className={st.userName} variant={'h3'}>
                {myEmail}
              </Typography>
              &quot;?
            </Typography>
          </ModalConfirmLogout>
        </div>
      </li>
    )
  })

  return (
    <PageWrapper>
      <div className={s.wrapper}>
        <LinearProgress active={isFetching} thickness={3} />
        <TabsPrimitive.Root
          activationMode={'manual'}
          onValueChange={setCurrentTab}
          value={currentTab}
        >
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
          <TabsPrimitive.Content value={'generalInformation'}>
            <div className={s.flexRow}>
              {!isFetching && (
                <>
                  <AvatarSelector
                    initialValue={data?.avatars[0]?.url ?? ''}
                    onValueChange={handleImageSelection}
                  />
                  <GeneralInfoForm profile={data} />
                </>
              )}
            </div>
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value={'devices'}>
            <div className={s.devicesWr}>
              <div className={s.currentDevice}>
                <Typography variant={'h3'}>Current device</Typography>
                <div className={s.browser}>
                  <Chrome />
                  <div className={s.typeBrouserAndIP}>
                    <Typography variant={'regularBold16'}>
                      {sessions?.current.browserName}
                    </Typography>
                    <Typography variant={'regular14'}>IP:{sessions?.current.ip}</Typography>
                  </div>
                </div>
              </div>
              <div className={s.terminateButton}>
                <Button type={'button'} variant={'outline'}>
                  Terminate all other session
                </Button>
              </div>
              <div className={s.activeSessions}>
                <Typography variant={'h3'}>Active sessions</Typography>
                <ul className={s.activeSessionsWr}>{otherSessions}</ul>
              </div>
            </div>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
        <div className={s.separator} />
      </div>
    </PageWrapper>
  )
}

GeneralInfo.getLayout = GetLayout
export default GeneralInfo
