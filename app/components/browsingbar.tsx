interface Props {
	data: {
		brands: string[]
		departments: string[]
		attributes?: any
	}
}

export default function BrowsingBar({ data }: Props) {
	const groups = ['brands', 'departments'].map(group => (
		<p key={group}>{group}</p>
	))

	return (
		<div>
			<div>{groups}</div>

			<ul>
				{data.brands.map((brand: string, i: number) => (
					<li key={i}>{brand}</li>
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
