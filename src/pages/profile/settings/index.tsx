import { ReactNode, useMemo, useState } from 'react'

import { AvatarSelector } from '@/components/create-avatar/AvatarSelector'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { GeneralInfoForm } from '@/components/profile-settings/general-info-form'
import { UserGeneralInfoData } from '@/components/profile-settings/general-info-form/schema'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from '@/services/incta-team-api/profile/profile-service'
import { Tabs } from '@chrizzo/ui-kit'

import pageStyles from './page.module.scss'

import { TabsValue, tabsList } from '../settingsPageTabsList'

export function EditProfile() {
  const { router, t } = useTranslation()

  const [updateProfile, { error }] = useUpdateProfileMutation()
  const { data: myProfileData, isFetching: isMyProfileFetching } = useGetMyProfileQuery()

  const tabs = useMemo(() => tabsList(t), [router?.locale])

  const [currentTab, setCurrentTab] = useState<TabsValue>(tabs[0].value as TabsValue)

  const [image, setImage] = useState<File | null>(null)

  const handleImageSelection = (file: File | null) => {
    //todo call mutation hook
    setImage(file)
  }

  const handleUpdateProfile = async (data: UserGeneralInfoData) => {
    await updateProfile(data)
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab as TabsValue)
  }

  return (
    <div className={pageStyles.wrapper}>
      <Tabs
        activationMode={'manual'}
        onValueChange={handleTabChange}
        tabs={tabs}
        value={currentTab}
      />

      {currentTab === 'generalInformation' && (
        <>
          <div className={pageStyles.flexRow}>
            <AvatarSelector onValueChange={handleImageSelection} />
            <GeneralInfoForm
              initialData={myProfileData}
              //recreate component on id change
              key={myProfileData?.id}
              onSubmit={handleUpdateProfile}
            />
          </div>
          <div className={pageStyles.separator} />
        </>
      )}
      {currentTab === 'devices' && (
        <>
          <div className={pageStyles.flexRow}>devices tab</div>
        </>
      )}
      {currentTab === 'accountManagement' && (
        <>
          <div className={pageStyles.flexRow}>accountManagement tab</div>
        </>
      )}
      {currentTab === 'myPayments' && (
        <>
          <div className={pageStyles.flexRow}>myPayments tab</div>
        </>
      )}
    </div>
  )
}

EditProfile.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default EditProfile
