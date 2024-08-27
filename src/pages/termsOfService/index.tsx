import { PageWrapper } from '@/components'
import { PolicyDocuments } from '@/components/auth/policyDocuments'

export function TermsOfService() {
  return (
    <PageWrapper>
      <PolicyDocuments headline={'Terms of Service'} />
    </PageWrapper>
  )
}

// TermsOfService.getLayout = GetBaseLayout
export default TermsOfService
