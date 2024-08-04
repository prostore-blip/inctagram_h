import { GetLayout, PageWrapper } from '@/components'
import { PolicyDocuments } from '@/components/auth/policyDocuments'

export function PrivacyPolicy() {
  return <PolicyDocuments headline={'Privacy Policy'} />
}

PrivacyPolicy.getLayout = GetLayout
export default PrivacyPolicy
