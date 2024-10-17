import React from 'react'

import { RowTablePaymentItem } from '@/components/profile-settings/MyPaymentsTable/RowTablePaymentItem'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetMyAllSubscriptionsQuery } from '@/services/inctagram.subscriptions.service'
import { Typography } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from '@/components/profile-settings/account-managment/accountManagment.module.scss'

const titlesTableHeadCells = [
  { id: 1, title: 'dateOfPay' },
  { id: 2, title: 'endPay' },
  { id: 3, title: 'price' },
  {
    id: 4,
    title: 'subType',
  },
  { id: 5, title: 'payType' },
]

export const MyPaymentsContent = () => {
  /**
   * Запрос за всеми моими подписками
   */
  const { data } = useGetMyAllSubscriptionsQuery()
  /**
   * интернационализация
   */
  const { t } = useTranslation()
  /**
   * Массив подписок для таблицы
   */
  const payments = data?.map(p => {
    return <RowTablePaymentItem key={p.subscriptionId + Math.random()} payment={p} />
  })
  /**
   * утилита для интернационализации имени столбцов
   * @param value
   */
  const getCellsName = (value: string) => {
    const key = value as keyof typeof t.payments.allPayments

    return t.payments.allPayments[key]
  }
  /**
   * массив названий столбцов
   */
  const titlesHeadCells = titlesTableHeadCells.map(t => {
    return (
      <th className={s.th}>
        <Typography className={s.dateAllPayment} variant={'regularBold14'}>
          {getCellsName(t.title)}
        </Typography>
      </th>
    )
  })

  return (
    <TabsPrimitive.Content className={s.wrapperMyAllPay} value={'myPayments'}>
      <table className={s.tablePayments}>
        <thead className={s.thead}>
          <tr className={s.tr}>{titlesHeadCells}</tr>
        </thead>
        <tbody className={s.tbody}>{payments}</tbody>
      </table>
    </TabsPrimitive.Content>
  )
}
