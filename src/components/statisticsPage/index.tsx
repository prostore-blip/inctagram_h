import React from 'react'

import { Typography } from '@chrizzo/ui-kit'

import s from './statistics.module.scss'

// import { ChartLines } from './ChartLine'

export const StatisticsPage: React.FC = () => {
  return (
    <Typography className={s.wrapperGraph}>
      <Typography as={'h1'} className={s.title}>
        Statistics
      </Typography>
      {/*<ChartLines label={'Like'} statisticsVariant={'like'} />*/}
      {/*<ChartLines label={'Comments'} statisticsVariant={'comments'} />*/}
      {/*<ChartLines label={'Publication views'} statisticsVariant={'Publication views'} />*/}
    </Typography>
  )
}

//todo ChartLines? statistics.module.scss?
//why a page is in components?
