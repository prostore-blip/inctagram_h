import { PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js'

import s from './paypal.module.scss'
const PayPalButton = ({ amount }: any) => {
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

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async data => {
    const res = await fetch('/api/paypal/captureOrder', {
      body: JSON.stringify({
        orderID: data.orderID,
      }),
      method: 'POST',
    })

    const captureData = await res.json()

    // Обработка успешного платежа
    console.log('Capture result', captureData)
    alert('Платеж успешно выполнен!')
  }
  const styles: PayPalButtonsComponentProps['style'] = {
    color: 'silver',
    disableMaxWidth: true,
    shape: 'sharp',
  }
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
    </div>
  )
}

export default PayPalButton
