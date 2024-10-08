import React from 'react'

import { AccountType } from '@/components/profile-settings/account-managment/AccountType'
import { SubscriptionCost } from '@/components/profile-settings/account-managment/SubscriptionCost'
import { useGetMyCurrentSubscriptionQuery } from '@/services/inctagram.subscriptions.service'
import { ResponseCurrentSubscriptionType } from '@/services/types'
import { Typography } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

type Props = {}

export const AccountManagmentContent = ({}: Props) => {
  /**
   * Запрос за моей текущей платной подпиской
   */
  const { data } = useGetMyCurrentSubscriptionQuery()

  return (
    <TabsPrimitive.Content className={s.wrapper} value={'accountManagement'}>
      <CurrentSubscription subscription={data} />
      <AccountType />
      <SubscriptionCost />
    </TabsPrimitive.Content>
  )
}

type Propss = {
  subscription: ResponseCurrentSubscriptionType | undefined
}
export const CurrentSubscription = ({ subscription }: Propss) => {
  return (
    <form className={s.currentSubWrapper}>
      <Typography className={s.description} variant={'h3'}>
        Current Subscription:
      </Typography>
      <table className={s.table}>
        <thead>
          <tr className={s.tr}>
            <th className={s.th}>
              <Typography className={s.datePayment} variant={'regular14'}>
                Expire at
              </Typography>
            </th>
            <th>
              <Typography className={s.datePayment} variant={'regular14'}>
                Next payment
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography variant={'regularBold14'}>
                {subscription?.data[0]?.dateOfPayment ?? 'DD.MM.YYYY'}
              </Typography>
            </td>
            <td>
              <Typography variant={'regularBold14'}>
                {subscription?.data[0]?.endDateOfSubscription ?? 'DD.MM.YYYY'}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}
