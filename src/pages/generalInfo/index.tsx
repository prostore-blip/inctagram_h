import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'

function GeneralInfo() {
  return <div>GeneralInfo</div>
}

GeneralInfo.getLayout = function getLayout(page: ReactNode) {
  //the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default GeneralInfo
