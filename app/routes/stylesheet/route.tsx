import { BigText } from '~/components/bigtext'
import styles from './stylesheet.module.css'

const StyleSheet = () => {
	return (
		<div className={styles.container}>
			<div>
				<BigText />
			</div>

			<div>
				<p>hello</p>
			</div>
		</div>
	)
}

export default StyleSheet
