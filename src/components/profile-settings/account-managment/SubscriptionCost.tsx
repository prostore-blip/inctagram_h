import React, { useState } from 'react'

import { RadioChecked, RadioUnchecked } from '@/assets/icons'
import { TypesSubscriptionCosts } from '@/components/profile-settings/account-managment/enums'
import { RadioGroup } from '@/components/radio-group/RadioGroup'
import { RadioGroupItem } from '@/components/radio-group/RadioGroupItem'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

export const SubscriptionCost = () => {
  const [checked, setChecked] = useState<TypesSubscriptionCosts>(TypesSubscriptionCosts.PerDay)

  return (
    <form name={'accountCostType'}>
      <Typography className={s.description} variant={'h3'}>
        Your subscription costs:
      </Typography>
      <RadioGroup
        className={s.accountTypeGroup}
        name={'accountCostType'}
        onValueChange={e => setChecked(e as TypesSubscriptionCosts)}
        value={checked}
      >
        <RadioGroupItem
          checked={checked === TypesSubscriptionCosts.PerDay}
          id={TypesSubscriptionCosts.PerDay}
          title={`${TypesSubscriptionCosts.CostDay} per 1 Day`}
          value={TypesSubscriptionCosts.PerDay}
          variant={'regular14'}
        >
          <>
            {checked === TypesSubscriptionCosts.PerDay && <RadioChecked />}
            {checked !== TypesSubscriptionCosts.PerDay && <RadioUnchecked />}
          </>
        </RadioGroupItem>
        <RadioGroupItem
          checked={checked === TypesSubscriptionCosts.PerWeek}
          id={TypesSubscriptionCosts.PerWeek}
          title={`${TypesSubscriptionCosts.CostWeek} per 7 Day`}
          value={TypesSubscriptionCosts.PerWeek}
          variant={'regular14'}
        >
          <>
            {checked === TypesSubscriptionCosts.PerWeek && <RadioChecked />}
            {checked !== TypesSubscriptionCosts.PerWeek && <RadioUnchecked />}
          </>
        </RadioGroupItem>
        <RadioGroupItem
          checked={checked === TypesSubscriptionCosts.PerMonth}
          id={TypesSubscriptionCosts.PerMonth}
          title={`${TypesSubscriptionCosts.CostMonth} per month`}
          value={TypesSubscriptionCosts.PerMonth}
          variant={'regular14'}
        >
          <>
            {checked === TypesSubscriptionCosts.PerMonth && <RadioChecked />}
            {checked !== TypesSubscriptionCosts.PerMonth && <RadioUnchecked />}
          </>
        </RadioGroupItem>
      </RadioGroup>
    </form>
  )
}
