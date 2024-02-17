import styled from '@emotion/styled'
import { Text } from './primitives/text'
import { Flex } from './primitives/flexbox'

interface Props {
	data: {
		brands: string[]
		departments: string[]
		attributes?: any
	}
}

const Container = styled.div`
	border: 2px solid rgba(126, 80, 0, 0.2);
	position: relative;
`

export default function BrowsingBar({ data }: Props) {
	const groups = ['brands', 'departments'].map((group) => (
		<Text key={group} fontSize="2xl">
			{group}
		</Text>
	))

	return (
		<Container>
			<Flex dir="row">{groups}</Flex>

			<ul>
				{data.brands.map((brand: string) => (
					<li key={brand}>{brand}</li>
				))}
			</ul>

			<ul>
				{data.departments.map((department: string) => (
					<li key={department}>{department}</li>
				))}
			</ul>
		</Container>
	)
}
