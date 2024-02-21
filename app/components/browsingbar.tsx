interface Props {
	data: {
		brands: string[]
		departments: string[]
		attributes?: any
	}
}

export default function BrowsingBar({ data }: Props) {
	const groups = ['brands', 'departments'].map(group => <p>{group}</p>)

	return (
		<div>
			<div>{groups}</div>

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
		</div>
	)
}
