import { UIMatch } from '@remix-run/react'
import styles from './breadcrumps.module.css'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<nav className={styles.container}>
			{matches
				.filter(match => match.handle && match.handle.breadcrumb)
				.map((match, index) => (
					<li key={index}>
						<span>{match.handle.breadcrumb(match)}</span>
					</li>
				))}
		</nav>
	)
}

export default Breadcrumps
