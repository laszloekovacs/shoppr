import { LoaderFunctionArgs } from '@remix-run/node'
import {
	Link,
	json,
	redirect,
	useLoaderData,
	useSearchParams
} from '@remix-run/react'
import { useEffect, useState } from 'react'

export default () => {
	const [status, setStatus] = useState('')
	const [customerEmail, setCustomerEmail] = useState('')
	const [searchParams] = useSearchParams()
	const session_id = searchParams.get('session_id')

	if (!session_id) {
		return <span>session id is null</span>
	}

	useEffect(() => {
		if (!session_id) {
			console.log('no sessh id')
			return
		}

		fetch(`/api/stripe?session_id=${session_id}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(data => {
				setStatus(data.status)
				setCustomerEmail(data.customerEmail)
			})
	}, [])

	if (status === 'open') {
		return redirect('/checkout')
	}

	if (status === 'complete') {
		return (
			<section id='success'>
				<p>
					We appreciate your business! A confirmation email will be sent to{' '}
					{customerEmail}. If you have any questions, please email{' '}
					<a href='mailto:orders@example.com'>orders@example.com</a>.
				</p>
				<Link to='/'>vissza a boltba</Link>
			</section>
		)
	}

	return null
}
