import { ReactNode } from 'react'

import { PolicyDocuments } from '@/components/auth/policyDocuments'
import { BaseLayout } from '@/components/layouts/BaseLayout'

function PrivacyPolicy() {
  return <PolicyDocuments headline={'Privacy Policy'} />
}

PrivacyPolicy.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}
export default PrivacyPolicy
