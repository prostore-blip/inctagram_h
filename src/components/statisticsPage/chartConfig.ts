export const labelsLine = (timeFrame: 'week' | 'month') => {
  return timeFrame === 'week'
    ? ['March 1', 'March 2', 'March 3', 'March 4', 'March 5', 'March 6', 'March 7']
    : [
        'March 1',
        'March 2',
        'March 3',
        'March 4',
        'March 5',
        'March 6',
        'March 7',
        'March 8',
        'March 9',
        'March 10',
        'March 11',
        'March 12',
        'March 13',
        'March 14',
        'March 15',
        'March 16',
        'March 17',
        'March 18',
        'March 19',
        'March 20',
        'March 21',
        'March 22',
        'March 23',
        'March 24',
        'March 25',
        'March 26',
        'March 27',
        'March 28',
        'March 29',
        'March 30',
        'March 31',
      ]
}

export const СommonChartDataset = (
  statisticsVariant: 'like' | 'comments' | 'Publication views'
) => {
  return {
    backgroundColor:
      statisticsVariant === 'like'
        ? '#cc1439'
        : statisticsVariant === 'comments'
          ? '#397DF6'
          : '#14CC70',
    borderColor:
      statisticsVariant === 'like'
        ? '#cc1439'
        : statisticsVariant === 'comments'
          ? '#397DF6'
          : '#14CC70',
    borderWidth: 1,
    pointRadius: 0,
  }
}

export const ChartOptions = (timeFrame: 'week' | 'month') => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number | string) => {
            const labels =
              timeFrame === 'week'
                ? ['March 1', '', '', '', '', '', 'March 7']
                : [
                    'March 1',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'March 31',
                  ]
            return labels[Number(value)]
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === 'number' && [0, 50, 100, 300, 500, 1000].includes(value)) {
              return value
            }
            return ''
          },
        },
        min: 0,
        max: 1000,
      },
    },
  }
}
