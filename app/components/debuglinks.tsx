import { Form, NavLink } from '@remix-run/react'
import styles from './debuglinks.module.css'

const DebugLinks = () => {
	const links = [
		{ to: '/', label: 'home' },
		{ to: '/dashboard', label: 'dashboard' },
		{ to: '/login', label: 'login' },
		{ to: '/p', label: 'list' },
		{ to: '/checkout', label: 'checkout' },
		{ to: '/stylesheet', label: 'stylesheet' }
	]

	return (
		<section className={styles.container}>
			{links.map(link => (
				<NavLink key={link.to} to={link.to}>
					{link.label}
				</NavLink>
			))}
		</section>
	)
}

export default DebugLinks
