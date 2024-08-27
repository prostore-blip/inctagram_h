import { GetNavLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Messenger() {
  return (
    <LoginNavigate>
      <PageWrapper>Messenger</PageWrapper>
    </LoginNavigate>
  )
}

// Messenger.getLayout = GetNavLayout
export default Messenger
