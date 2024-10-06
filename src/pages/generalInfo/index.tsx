import { GetLayout, PageWrapper } from '@/components'
import { ProfileSettings } from '@/components/profile-settings'

export function GeneralInfo() {
  return (
    <PageWrapper>
      <ProfileSettings />
    </PageWrapper>
  )
}

GeneralInfo.getLayout = GetLayout
export default GeneralInfo
