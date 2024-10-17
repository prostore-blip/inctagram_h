import React from 'react'

import {
  changeTypeOfDate,
  usePaymentPeriod,
  usePaymentService,
} from '@/components/profile-settings/account-managment/utils/utils'
import { AllSubscriptionsType } from '@/services/types'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

type Props = {
  payment: AllSubscriptionsType
}
export const RowTablePaymentItem = ({ payment }: Props) => {
  const paymentPeriod = usePaymentPeriod(payment.subscriptionType)
  const paymentService = usePaymentService(payment.paymentType)

  return (
    <tr className={s.tr}>
      <td className={s.td}>
        <Typography variant={'regular14'}>{changeTypeOfDate(payment.dateOfPayment)}</Typography>
      </td>
      <td className={s.td}>
        <Typography variant={'regular14'}>
          {changeTypeOfDate(payment.endDateOfSubscription)}
        </Typography>
      </td>
      <td className={s.td}>
        <Typography className={s.price} variant={'regular14'}>
          ${payment.price}
        </Typography>
      </td>
      <td className={s.td}>
        <Typography variant={'regular14'}>{paymentPeriod}</Typography>
      </td>
      <td className={s.td}>
        <Typography variant={'regular14'}>{paymentService}</Typography>
      </td>
    </tr>
  )
}
