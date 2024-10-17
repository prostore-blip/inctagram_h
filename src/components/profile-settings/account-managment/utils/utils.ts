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

export const usePaymentPeriod = (periodSubscription: DescriptionPaymentType) => {
  const { t } = useTranslation()
  let paymentPeriod

  if (periodSubscription === 'DAY') {
    // paymentPeriod = t.payments.cost.day
    paymentPeriod = '1 day'
  }
  if (periodSubscription === 'WEEKLY') {
    // paymentPeriod = t.payments.cost.week
    paymentPeriod = '7 days'
  }
  if (periodSubscription === 'MONTHLY') {
    // paymentPeriod = t.payments.cost.month
    paymentPeriod = '1 month'
  }

  return paymentPeriod
}

export const usePaymentService = (service: 'PAYPAL' | 'STRIPE') => {
  if (service === 'STRIPE') {
    return 'Stripe'
  }

  return 'Paypal'
}
