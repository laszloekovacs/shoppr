import { BigText } from '~/components/bigtext'

import { Flex } from '~/components/flex'

const StyleBook = () => {
	return (
		<div>
			<BigText></BigText>

			<div>
				<Flex dir="col">
					<p>inside</p>
					<p>flex col</p>
					<p>container</p>
				</Flex>
				<Flex dir="row">
					<p>inside</p>
					<p>flex row</p>
					<p>container</p>
				</Flex>
				<Flex dir="row" justify="center">
					<p>inside</p>
					<p>flex</p>
					<p>container</p>
				</Flex>
			</div>
		</div>
	)
}

export default StyleBook
