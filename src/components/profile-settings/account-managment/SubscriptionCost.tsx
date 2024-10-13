import React, { useState } from 'react'

import { CostItem } from '@/components/profile-settings/account-managment/CostItem'
import { RadioGroup } from '@/components/radio-group/RadioGroup'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetCostOfPaymentSubscriptionsQuery } from '@/services/inctagram.subscriptions.service'
import { DescriptionPaymentType } from '@/services/types'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

export const SubscriptionCost = () => {
  /**
   * выбор стоимости подписки
   */
  const [checked, setChecked] = useState<DescriptionPaymentType>('DAY')
  /**
   * запрос за вариантами стоимости подписки
   */
  const { data } = useGetCostOfPaymentSubscriptionsQuery()
  /**
   * интернационализация
   */
  const { t } = useTranslation()
  /**
   * массив видов подписок
   */
  const costPayment = data?.data?.map(p => {
    return <CostItem checked={checked} item={p} key={p.typeDescription} />
  })

  return (
    <form name={'accountCostType'}>
      <Typography className={s.description} variant={'h3'}>
        {t.payments.cost.title}:
      </Typography>
      <RadioGroup
        className={s.accountTypeGroup}
        name={'accountCostType'}
        onValueChange={e => setChecked(e as DescriptionPaymentType)}
        value={checked}
      >
        {costPayment}
      </RadioGroup>
    </form>
  )
}
