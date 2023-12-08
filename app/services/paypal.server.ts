/*
import {
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    PAYPAL_ENDPOINT,
} from 'app/constants/index.server'

export const getAccessToken = async () => {
    const credentials = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
        'utf-8'
    ).toString('base64')

    const res = await fetch(`${PAYPAL_ENDPOINT}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials',
    })

    const data = await res.json()

    return data.access_token
}

const createOrder = async (cart: string) => {
    const token = await getAccessToken()
    const url = `${PAYPAL_ENDPOINT}/v2/checkout/orders`
    const payload = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'HUF',
                    value: '500.00',
                },
            },
        ],
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    })

    const data = await res.json()
    return data
}

const captureOrder = async (cart: string) => {
    const token = await getAccessToken()
    const url = `${PAYPAL_ENDPOINT}/v2/checkout/orders/${cart}/capture`

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await res.json()
    return data
}

*/
