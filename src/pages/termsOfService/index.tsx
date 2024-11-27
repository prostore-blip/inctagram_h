import { ReactNode } from 'react'

import { PolicyDocuments } from '@/components/auth/policyDocuments'
import { BaseLayout } from '@/components/layouts/BaseLayout'

function TermsOfService() {
  return (
    <>
      <PolicyDocuments headline={'Terms of Service'} />
    </>
  )
}

TermsOfService.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default TermsOfService
