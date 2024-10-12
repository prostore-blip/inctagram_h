import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.CLIENT_ID_PAYPAL
  const secret = process.env.SECRET_ID_PAYPAL

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { currency, total } = req.body

  try {
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()

      console.error(errorData)

      return res.status(tokenResponse.status).json({ error: 'Failed to fetch access token' })
    }

    const { access_token: accessToken } = await tokenResponse.json()
    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency || 'USD',
              value: total,
            },
          },
        ],
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()

      throw new Error(`Order Error: ${errorData.message}`)
    }

    const orderData = await orderResponse.json()

    res.status(200).json(orderData)
  } catch (error) {
    console.error('Fetch error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
