import { BigText } from '~/components/bigtext'
import * as styles from './stylesheet.css'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const StyleSheet = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<BigText />
			</div>

			<ChevronRightIcon className='w-1' />
		</div>
	)
}

export default StyleSheet
