import Stripe from 'stripe'
import { singleton } from './singleton.server'
import { constants } from './constants.server'

export const stripe = singleton(
	'stripe',
	() => new Stripe(constants.STRIPE_SECRET_KEY!)
)
