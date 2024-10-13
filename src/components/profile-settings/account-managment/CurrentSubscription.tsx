import React, { useState } from 'react'

import { changeTypeOfDate } from '@/components/profile-settings/account-managment/utils/utils'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetCancelAutorenevalSubscriptionMutation } from '@/services/inctagram.subscriptions.service'
import { ResponseCurrentSubscriptionType } from '@/services/types'
import { Checkbox, Typography } from '@chrizzo/ui-kit'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

type Props = {
  subscription: ResponseCurrentSubscriptionType | undefined
}
export const CurrentSubscription = ({ subscription }: Props) => {
  const [getCancelAutorenevalSubscription] = useGetCancelAutorenevalSubscriptionMutation()
  /**
   * дата начала подписки
   */
  const dataOfPayment = changeTypeOfDate(subscription?.data[0]?.dateOfPayment)
  /**
   * дата окончания подписки
   */
  const expiredData = changeTypeOfDate(subscription?.data[0]?.endDateOfSubscription)
  /**
   * интернационализация
   */
  const { t } = useTranslation()

  return (
    <form
      className={s.currentSubWrapper}
      id={'currentSubscriptionForm'}
      name={'currentSubscriptionForm'}
    >
      <Typography className={s.description} variant={'h3'}>
        {t.payments.currentSubscription.title}:
      </Typography>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>
              <Typography className={s.datePayment} variant={'regular14'}>
                {t.payments.currentSubscription.expired}
              </Typography>
            </th>
            <th className={s.th}>
              <Typography className={s.datePayment} variant={'regular14'}>
                {t.payments.currentSubscription.nextPayment}
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          <tr className={s.tr}>
            <td className={s.td}>
              <Typography variant={'regularBold14'}>{dataOfPayment ?? 'DD.MM.YYYY'}</Typography>
            </td>
            <td className={s.td}>
              <Typography variant={'regularBold14'}>{expiredData ?? 'DD.MM.YYYY'}</Typography>
            </td>
          </tr>
        </tbody>
      </table>
      <Checkbox
        checked={subscription?.hasAutoRenewal}
        label={t.payments.currentSubscription.autoReneval}
        name={'autoreneval'}
        onCheckedChange={checked => {
          if (typeof checked === 'boolean' && !checked) {
            getCancelAutorenevalSubscription()
          }
        }}
      />
    </form>
  )
}
