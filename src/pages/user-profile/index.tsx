import { getNavLayout } from '@/components/Layout/NavLayout/navLayout'
import { PageWrapper } from '@/components/PageWrapper/pageWrapper'

export function UserProfile() {
  return <PageWrapper>UserProfile</PageWrapper>
}

UserProfile.getLayout = getNavLayout
export default UserProfile
