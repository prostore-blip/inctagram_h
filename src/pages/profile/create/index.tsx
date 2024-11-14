import { ReactNode, useMemo } from 'react'

import { AvatarSelector } from '@/components/create-avatar/AvatarSelector'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { GeneralInfoForm } from '@/components/profile-settings/general-info-form'
import { UserGeneralInfoData } from '@/components/profile-settings/general-info-form/schema'
import { useTranslation } from '@/hooks/useTranslation'
import { useCreateProfileMutation } from '@/services/incta-team-api/profile/profile-service'
import { Tabs } from '@chrizzo/ui-kit'

import pageStyles from './page.module.scss'

import { tabsList } from '../settingsPageTabsList'

export function CreateProfile() {
  const { router, t } = useTranslation()

  const [createProfile, { error }] = useCreateProfileMutation()

  const handleCreateProfile = async (data: UserGeneralInfoData) => {
    await createProfile(data)
  }

  const tabs = useMemo(
    () => tabsList(t).map(tab => (tab.value === 'generalInfo' ? tab : { ...tab, disabled: true })),
    [router?.locale]
  )

  return (
    <div className={pageStyles.wrapper}>
      <Tabs activationMode={'manual'} tabs={tabs} value={'generalInformation'} />

      <div className={pageStyles.flexRow}>
        <AvatarSelector onValueChange={() => {}} />
        <GeneralInfoForm onSubmit={handleCreateProfile} />
      </div>
      <div className={pageStyles.separator} />
    </div>
  )
}

CreateProfile.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default CreateProfile
