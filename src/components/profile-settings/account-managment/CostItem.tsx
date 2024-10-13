import React from 'react'

import { RadioChecked, RadioUnchecked } from '@/assets/icons'
import { useSubscriptionPeriod } from '@/components/profile-settings/account-managment/utils/utils'
import { RadioGroupItem } from '@/components/radio-group/RadioGroupItem'
import { CostPaymentSubscriptionsType, DescriptionPaymentType } from '@/services/types'

type Props = {
  checked: DescriptionPaymentType
  item: CostPaymentSubscriptionsType
}
export const CostItem = ({ checked, item }: Props) => {
  /**
   * хук названия для подписок в зависимости от длительности подписки. Внутри используется интернационализация
   */
  const subscrPeriod = useSubscriptionPeriod(item.typeDescription)

  return (
    <RadioGroupItem
      checked={checked === item.typeDescription}
      id={item.typeDescription}
      title={`$${item.amount} ${subscrPeriod}`}
      value={item.typeDescription}
      variant={'regular14'}
    >
      <>
        {checked === item.typeDescription && <RadioChecked />}
        {checked !== item.typeDescription && <RadioUnchecked />}
      </>
    </RadioGroupItem>
  )
}
