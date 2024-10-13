import React, { useState } from 'react'

import { RadioChecked, RadioUnchecked } from '@/assets/icons'
import { TypesAccount } from '@/components/profile-settings/account-managment/enums'
import { RadioGroup } from '@/components/radio-group/RadioGroup'
import { RadioGroupItem } from '@/components/radio-group/RadioGroupItem'
import { useTranslation } from '@/hooks/useTranslation'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

export const AccountType = () => {
  /**
   * выбор типа аккаунта
   */
  const [checked, setChecked] = useState<TypesAccount>(TypesAccount.Business)
  /**
   * интернационализация
   */
  const { t } = useTranslation()

  return (
    <form className={s.account} name={'accountType'}>
      <Typography className={s.description} variant={'h3'}>
        {t.payments.account.accountType}:
      </Typography>
      <RadioGroup
        className={s.accountTypeGroup}
        name={'accountType'}
        onValueChange={e => setChecked(e as TypesAccount)}
        value={checked}
      >
        <RadioGroupItem
          checked={checked === TypesAccount.Personal}
          id={TypesAccount.Personal}
          title={t.payments.account.personal}
          value={TypesAccount.Personal}
          variant={'regular14'}
        >
          <>
            {checked === TypesAccount.Personal && <RadioChecked />}
            {checked === TypesAccount.Business && <RadioUnchecked />}
          </>
        </RadioGroupItem>
        <RadioGroupItem
          checked={checked === TypesAccount.Business}
          id={TypesAccount.Business}
          title={t.payments.account.business}
          value={TypesAccount.Business}
          variant={'regular14'}
        >
          <>
            {checked === TypesAccount.Business && <RadioChecked />}
            {checked === TypesAccount.Personal && <RadioUnchecked />}
          </>
        </RadioGroupItem>
      </RadioGroup>
    </form>
  )
}
