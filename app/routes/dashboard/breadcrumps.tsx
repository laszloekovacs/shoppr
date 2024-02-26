import { UIMatch } from '@remix-run/react'
import styles from './dashboard.module.css'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<nav className={styles.breadcrumps}>
			{matches
				.filter(match => match.handle && match.handle.breadcrumb)
				.map((match, index) => (
					<li key={index}>{match.handle.breadcrumb(match)}</li>
				))}
		</nav>
	)
}

export default Breadcrumps
