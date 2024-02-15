import { useEffect } from 'react'

const RawData = ({ data }: { data: any }) => {
	useEffect(() => {
		// @ts-ignore
		hljs.highlightAll()
	}, [])

	return (
		<details open>
			<summary>Raw Data</summary>

			<pre className="json">
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</details>
	)
}

export default RawData
