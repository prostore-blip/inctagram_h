import { GetNavLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function FriendProfile() {
  return (
    <LoginNavigate>
      <PageWrapper>FriendProfile</PageWrapper>
    </LoginNavigate>
  )
}

// FriendProfile.getLayout = GetNavLayout
export default FriendProfile
