import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import { Tabs, Typography } from '@chrizzo/ui-kit'
import {
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import s from './statistics.module.scss'

import { ChartOptions, labelsLine, СommonChartDataset } from './chartConfig'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
)

type PropsLine = {
  data?: string
  label: string
  statisticsVariant: 'Publication views' | 'comments' | 'like'
}

export const ChartLines = (props: PropsLine) => {
  const { data, label, statisticsVariant } = props
  const [chartData, setChartData] = useState<{
    datasets: {
      backgroundColor: string
      borderColor: string
      borderWidth: number
      data: number[]
      pointRadius: number
    }[]
    labels: string[]
  } | null>(null)
  const [timeFrame, setTimeFrame] = useState<'month' | 'week'>('week')

  useEffect(() => {
    const fetchData = () => {
      setChartData({
        datasets: [
          {
            ...СommonChartDataset(statisticsVariant),
            data:
              timeFrame === 'week'
                ? [0, 500, 100, 100, 0, 0, 1000]
                : [
                    50, 70, 1000, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 0, 0, 0, 0, 0, 0, 1000, 0,
                    0, 0, 500, 100, 100, 700, 700,
                  ],
          },
        ],
        labels: labelsLine(timeFrame),
      })
    }

    fetchData()
  }, [timeFrame])

  const handleTabChange = (value: string) => {
    if (value === 'week' || value === 'month') {
      setTimeFrame(value)
    }
  }

  console.log('timeFrame', timeFrame)

  return (
    <div className={s.Container}>
      <Typography className={s.topGrapgWrapper}>
        <Typography className={s.describeTabl} variant={'regular16'}>
          {label}
        </Typography>
        <Typography className={s.buttonWrapper} textAlign={'end'}>
          <Tabs
            onValueChange={handleTabChange}
            tabs={[
              { title: 'Week', value: 'week' },
              { title: 'Month', value: 'month' },
            ]}
            value={timeFrame}
            variant={'blue'}
          ></Tabs>
        </Typography>
      </Typography>
      <Typography className={s._typography_1swhg_1}>
        {chartData ? (
          <Line
            className={s.statistics_Line__RBoUW}
            data={chartData}
            options={{
              ...ChartOptions(timeFrame),
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Typography>
    </div>
  )
}
