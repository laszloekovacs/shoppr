interface Props {
	name: string
	url?: string
}

const Card = (props: Props) => {
	return (
		<div style={{ display: 'inline-block' }}>
			<div>
				<img src="https://picsum.photos/200" alt={props.name} height={200} />

				<div>
					<p>{props.name}</p>
					<p>400Ft</p>
				</div>
			</div>
		</div>
	)
}
export default Card
