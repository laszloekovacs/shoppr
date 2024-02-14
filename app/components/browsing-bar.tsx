import React from 'react'

export default function BrowsingBar({
	data,
}: {
	data: {
		brands: string[]
		departments: string[]
		attributes: any
	}
}) {
	return (
		<div>
			<h3>Brands</h3>
			<ul>
				{data.brands.map((brand: string) => (
					<li key={brand}>{brand}</li>
				))}
			</ul>

			<h3>Departments</h3>
			<ul>
				{data.departments.map((department: string) => (
					<li key={department}>{department}</li>
				))}
			</ul>

			<hr />
		</div>
	)
}

//<pre>{JSON.stringify(data, null, 2)}</pre>
