import styles from './stylesheet.module.css'
import { Display } from '~/components/display'

const StyleSheet = () => {
	return (
		<div className={styles.container}>
			<div>
				<p>hello</p>
			</div>

			<Display>hello</Display>

			<div>
				<input type='text' placeholder='hello' />
				<input type='radio' checked />
				<input type='submit' checked />
			</div>
		</div>
	)
}

export default StyleSheet
