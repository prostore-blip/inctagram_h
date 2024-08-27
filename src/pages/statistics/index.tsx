import { PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Statistics() {
  return (
    <LoginNavigate>
      <PageWrapper>Statistics</PageWrapper>
    </LoginNavigate>
  )
}

// Statistics.getLayout = GetNavLayout
export default Statistics
