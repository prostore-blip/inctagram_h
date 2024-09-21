import { GetLayout, PageWrapper } from '@/components'
import { PolicyDocuments } from '@/components/auth/policyDocuments'
import { Scroll } from '@/components/scroll'

export function PrivacyPolicy() {
  return (
    <PageWrapper>
      <Scroll height={'calc(100vh - 61px)'}>
        <PolicyDocuments headline={'Privacy Policy'} />
      </Scroll>
    </PageWrapper>
  )
}

// PrivacyPolicy.getLayout = GetLayout
export default PrivacyPolicy
