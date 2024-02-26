import { BigText } from '~/components/bigtext'
import * as styles from './stylesheet.css'

const StyleSheet = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<BigText />
			</div>
		</div>
	)
}

export default StyleSheet
