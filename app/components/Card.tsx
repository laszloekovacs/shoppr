import styled from '@emotion/styled'

const CardBase = ({
	className,
	name,
}: {
	className?: string
	name: string
}) => {
	return (
		<div className={className}>
			<img src="https://picsum.photos/200" alt={name} height={200} />

			<div className="info">
				<h3>{name}</h3>
				<p>400</p>
			</div>
		</div>
	)
}

export default styled(CardBase)`
	border: 3px solid black;
	border-radius: 3px;
	width: 200px;
	img {
		border: 3px solid red;
		width: 100%;
	}

	.info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		padding: 1px;
		overflow: hidden;
		gap: 1ch;
	}
	.info h3 {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`
