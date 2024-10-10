export const labelsLine = (timeFrame: 'month' | 'week') => {
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
  statisticsVariant: 'Publication views' | 'comments' | 'like'
) => {
  let backgroundColor, borderColor

  if (statisticsVariant === 'like') {
    backgroundColor = '#cc1439'
    borderColor = '#cc1439'
  } else if (statisticsVariant === 'comments') {
    backgroundColor = '#397DF6'
    borderColor = '#397DF6'
  } else {
    backgroundColor = '#14CC70'
    borderColor = '#14CC70'
  }

  return {
    backgroundColor,
    borderColor,
    borderWidth: 1,
    pointRadius: 0,
  }
}

export const ChartOptions = (timeFrame: 'month' | 'week') => {
  return {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
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
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        max: 1000,
        min: 0,
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === 'number' && [0, 50, 100, 300, 500, 1000].includes(value)) {
              return value
            }

            return ''
          },
        },
      },
    },
  }
}
