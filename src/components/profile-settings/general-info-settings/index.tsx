import { ResponseDataUserProfile } from '@/components/posts/types'
import { AvatarSelector } from '@/components/profile-settings/general-info-settings/avatar-selector'
import { GeneralInfoForm } from '@/components/profile-settings/general-info-settings/general-info-form'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from './generalInfoContetnt.module.scss'

type Props = {
  isFetching: boolean
  onValueChange: (file: File | null) => void
  profileData: ResponseDataUserProfile | undefined
}
export const GeneralInfoContent = ({ isFetching, onValueChange, profileData }: Props) => {
  return (
    <TabsPrimitive.Content value={'generalInformation'}>
      <div className={s.flexRow}>
        {!isFetching && (
          <>
            <AvatarSelector
              initialValue={profileData?.avatars[0]?.url ?? ''}
              onValueChange={onValueChange}
            />
            <GeneralInfoForm profile={profileData} />
          </>
        )}
      </div>
    </TabsPrimitive.Content>
  )
}
