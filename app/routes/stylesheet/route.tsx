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

			<div>
				<input type='text' placeholder='hello' />
				<input type='radio' checked />
				<input type='submit' checked />
			</div>
		</div>
	)
}

export default StyleSheet
