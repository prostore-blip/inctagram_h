import { Tabs, Typography } from '@chrizzo/ui-kit'
import s from './statistics.module.scss'
import { useEffect, useState } from 'react'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
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
  label: string
  statisticsVariant: 'like' | 'comments' | 'Publication views'
  data?: string
}

export const ChartLines = (props: PropsLine) => {
  const { label, statisticsVariant, data } = props
  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: {
      backgroundColor: string
      borderColor: string
      pointRadius: number
      borderWidth: number
      data: number[]
    }[]
  } | null>(null)
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week')
  useEffect(() => {
    const fetchData = () => {
      setChartData({
        labels: labelsLine(timeFrame),
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
        <Typography className={s.describeTabl} variant="regular16">
          {label}
        </Typography>
        <Typography className={s.buttonWrapper} textAlign="end">
          <Tabs
            value={timeFrame}
            tabs={[
              { value: 'week', title: 'Week' },
              { value: 'month', title: 'Month' },
            ]}
            variant={'blue'}
            onValueChange={handleTabChange}
          ></Tabs>
        </Typography>
      </Typography>
      <Typography className={s._typography_1swhg_1}>
        {chartData ? (
          <Line
            options={{
              ...ChartOptions(timeFrame),
            }}
            className={s.statistics_Line__RBoUW}
            data={chartData}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Typography>
    </div>
  )
}
