import { BigText } from '~/components/bigtext'
import { themeClass } from '~/components/bigtext.css'

const StyleBook = () => {
	return (
		<div className={themeClass}>
			<BigText></BigText>
			<button className="btn-primary">primary</button>
		</div>
	)
}

export default StyleBook
