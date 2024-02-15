const RawData = ({ data }: { data: any }) => (
	<details>
		<summary>Raw Data</summary>

		<pre className="json">
			<code>{JSON.stringify(data, null, 2)}</code>
			<script defer>hljs.highlightAll();</script>
		</pre>
	</details>
)

export default RawData
