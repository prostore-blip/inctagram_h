import React from 'react'

import { AccountType } from '@/components/profile-settings/account-managment/AccountType'
import { CurrentSubscription } from '@/components/profile-settings/account-managment/CurrentSubscription'
import { SubscriptionCost } from '@/components/profile-settings/account-managment/SubscriptionCost'
import { useGetMyCurrentSubscriptionQuery } from '@/services/inctagram.subscriptions.service'
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
