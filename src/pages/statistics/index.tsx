import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'

function Statistics() {
  return <div>Statistics</div>
}

Statistics.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}
export default Statistics
