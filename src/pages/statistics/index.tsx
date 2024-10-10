import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { StatisticsPage } from '@/components/statisticsPage'

export function Statistics() {
  return <StatisticsPage />
}

Statistics.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}
export default Statistics
