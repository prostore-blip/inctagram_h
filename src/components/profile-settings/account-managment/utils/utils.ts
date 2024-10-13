import { useTranslation } from '@/hooks/useTranslation'
import { DescriptionPaymentType } from '@/services/types'

export const changeTypeOfDate = (date: string | undefined) => {
  return date?.split('T')[0].split('-').reverse().join('.')
}

export const useSubscriptionPeriod = (periodSubscription: DescriptionPaymentType) => {
  const { t } = useTranslation()
  let subscrPeriod

  if (periodSubscription === 'DAY') {
    subscrPeriod = t.payments.cost.day
  }
  if (periodSubscription === 'WEEKLY') {
    subscrPeriod = t.payments.cost.week
  }
  if (periodSubscription === 'MONTHLY') {
    subscrPeriod = t.payments.cost.month
  }

  return subscrPeriod
}
