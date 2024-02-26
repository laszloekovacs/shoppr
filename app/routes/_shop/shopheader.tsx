import { Form, Link } from '@remix-run/react'
import { Auth0Profile } from 'remix-auth-auth0'
import styles from './shopheader.module.css'

type Props = {
	user?: Auth0Profile
}

const ShopHeader = ({ user }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.account}>
				{user && <span>{user.displayName}</span>}
				<Link to='/account/favorites'>favorites</Link>
				<Link to='/account'>account</Link>
				{user ? (
					<Form action='/api/auth0/logout' method='POST'>
						<input type='submit' value='Jelentkezz ki' />
					</Form>
				) : (
					<Link to='/login'>login</Link>
				)}
			</div>

			<div>
				<Link to='/'>
					<img src='https://picsum.photos/70/40' alt='logo' />
				</Link>
				<input type='search' placeholder='kereses' />
				<Link to='/account/cart'>Kosar</Link>
			</div>
		</section>
	)
}

export default ShopHeader
