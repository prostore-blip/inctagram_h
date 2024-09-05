import React from 'react'
import { PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'
import { StatisticsPage } from '@/components/statisticsPage'

export const Statistics: React.FC = () => {
  return (
    <LoginNavigate>
      <PageWrapper>
        <StatisticsPage />
      </PageWrapper>
    </LoginNavigate>
  )
}
