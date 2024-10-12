import { useState } from 'react'

import { ModalPayment } from '@/components/modal-payment'
import { PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js'

import s from './paypal.module.scss'

const PayPalButton = ({ amount }: any) => {
  /**
   * стейт отображения модалки успешной или неуспешной оплаты
   */
  const [isShowModalSuccessOrFailedPayment, setIsShowModalSuccessOrFailedPayment] =
    useState<string>('')
  /**
   * коллбек создания платежа
   */
  const createOrder: PayPalButtonsComponentProps['createOrder'] = async () => {
    const res = await fetch('/api/paypal/createOrder', {
      body: JSON.stringify({
        currency: 'USD', // Или другая валюта
        total: amount,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const order = await res.json()

    return order.id
  }
  /**
   * коллбек запроса на оплату
   * @param data - объект с идентификатором оплаты. Насколько я понял, data формируется
   * после успешной работы коллбека "createOrder"
   */
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async data => {
    try {
      const res = await fetch('/api/paypal/captureOrder', {
        body: JSON.stringify({
          orderID: data.orderID,
        }),
        method: 'POST',
      })

      const captureData = await res.json()

      console.log('Capture result', captureData)
      setIsShowModalSuccessOrFailedPayment('success')
    } catch (e) {
      console.log('Capture result', e)
      setIsShowModalSuccessOrFailedPayment('failed')
    }
  }
  /**
   * стили для кнопки PayPal. Типы стилей определяются билиотекой paypal, а не HTML
   */
  const styles: PayPalButtonsComponentProps['style'] = {
    color: 'silver',
    disableMaxWidth: true,
    shape: 'sharp',
  }
  /**
   * коллбек ошибки при оплате
   */
  const onError = () => {
    alert('Transaction is blocked')
  }

  return (
    <div className={s.paypalContainer}>
      <PayPalButtons
        createOrder={createOrder}
        fundingSource={'paypal'}
        onApprove={onApprove}
        onError={onError}
        style={styles}
      />
      {isShowModalSuccessOrFailedPayment === 'success' && (
        <ModalPayment
          buttonTitle={'OK'}
          callback={setIsShowModalSuccessOrFailedPayment}
          classNameContent={s.contentSuccessModal}
          description={'Payment was successful!'}
          title={'Success'}
        />
      )}
      {isShowModalSuccessOrFailedPayment === 'failed' && (
        <ModalPayment
          buttonTitle={'Back to payment'}
          callback={setIsShowModalSuccessOrFailedPayment}
          classNameContent={s.contentFailedModal}
          description={'Transaction failed. Please, write to support'}
          title={'Error'}
        />
      )}
    </div>
  )
}

export default PayPalButton
