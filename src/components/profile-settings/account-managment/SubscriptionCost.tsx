import React, { FormEvent, useState } from 'react'

import { Paypal, Stripe } from '@/assets/icons'
import { CostItem } from '@/components/profile-settings/account-managment/CostItem'
import { RadioGroup } from '@/components/radio-group/RadioGroup'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useGetCostOfPaymentSubscriptionsQuery,
  useGetCreateSubscriptionMutation,
} from '@/services/inctagram.subscriptions.service'
import { DescriptionPaymentType } from '@/services/types'
import { Button, Typography } from '@chrizzo/ui-kit'
import { useRouter } from 'next/router'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

export const SubscriptionCost = () => {
  const router = useRouter()
  /**
   * выбор стоимости подписки
   */
  const [checked, setChecked] = useState<DescriptionPaymentType>('DAY')
  /**
   * запрос за вариантами стоимости подписки
   */
  const { data } = useGetCostOfPaymentSubscriptionsQuery()
  /**
   *
   */
  const [getCreateSubscription] = useGetCreateSubscriptionMutation()
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
  /**
   * обработчик формы
   * @param e - событие
   */
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /**
     * вытягиваем выбранный радиоинпут из формы
     */
    const formData = new FormData(e.currentTarget)
    const selectedValue = formData.get('accountCostType')
    /**
     * ищем тип подписки из возможных подписок, приходящих с сервера
     */
    const findCost = data?.data?.find(p => p.typeDescription === selectedValue)
    /**
     * Определяем кнопку, по которой засабмитилась форма
     */
    const submitEvent = e.nativeEvent as SubmitEvent
    const button = submitEvent.submitter as HTMLButtonElement
    /**
     * формируем объект для запроса на сервер
     */
    const body = {
      amount: findCost?.amount as number,
      baseUrl: 'http://localhost:3000/en/generalInfo/accountManagement',
      paymentType: button.name,
      typeSubscription: selectedValue as DescriptionPaymentType,
    }
    /**
     * делаем запрос на создание новой подписки
     */
    const res = await getCreateSubscription(body).unwrap()

    /**
     * если в ответе есть url, то переходим по нему на страницу платёжного сервиса
     */
    if (res.url) {
      void router.push(res.url)
    }
  }

  return (
    <form className={s.formSubscriptionCosts} name={'accountCostType'} onSubmit={submit}>
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
      <div className={s.buttonGroup}>
        <Button name={'PAYPAL'} type={'submit'}>
          <Paypal />
        </Button>
        <Typography variant={'regular14'}>Or</Typography>
        <Button name={'STRIPE'} type={'submit'}>
          <Stripe />
        </Button>
      </div>
    </form>
  )
}
