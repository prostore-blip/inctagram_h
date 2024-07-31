import { GetNavLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function MyProfile() {
  return (
    <LoginNavigate>
      <PageWrapper>MyProfile</PageWrapper>
    </LoginNavigate>
  )
}

MyProfile.getLayout = GetNavLayout
export default MyProfile
