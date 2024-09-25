import { PageWrapper } from '@/components'
import { PolicyDocuments } from '@/components/auth/policyDocuments'

export function PrivacyPolicy() {
  return (
    <PageWrapper>
      <PolicyDocuments headline={'Privacy Policy'} />
    </PageWrapper>
  )
}

// PrivacyPolicy.getLayout = GetLayout
export default PrivacyPolicy
