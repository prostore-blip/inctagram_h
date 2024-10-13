import React from 'react'

import { AccountType } from '@/components/profile-settings/account-managment/AccountType'
import { CurrentSubscription } from '@/components/profile-settings/account-managment/CurrentSubscription'
import { SubscriptionCost } from '@/components/profile-settings/account-managment/SubscriptionCost'
import PayPalButton from '@/components/profile-settings/account-managment/paypal-button'
import { useGetMyCurrentSubscriptionQuery } from '@/services/inctagram.subscriptions.service'
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

type Props = {}

export const AccountManagmentContent = ({}: Props) => {
  /**
   * Запрос за моей текущей платной подпиской
   */
  const { data } = useGetMyCurrentSubscriptionQuery()
  /**
   * для кнопки paypal. Объект настроек
   */
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL as string,
    components: ['buttons', 'funding-eligibility'],
    currency: 'USD',
  }

  return (
    <TabsPrimitive.Content className={s.wrapper} value={'accountManagement'}>
      <CurrentSubscription subscription={data} />
      <AccountType />
      <SubscriptionCost />
      <PayPalScriptProvider options={initialOptions}>
        <div>
          <PayPalButton amount={'10.00'} />
        </div>
      </PayPalScriptProvider>
    </TabsPrimitive.Content>
  )
}
