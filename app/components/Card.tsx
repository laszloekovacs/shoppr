import styled from '@emotion/styled'

const Block = styled.div`
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
	}
`

const Card = ({ product, price }: { product: string; price: string }) => {
	return (
		<Block>
			<img src="https://picsum.photos/200" alt={product} height={200} />

			<div className="info">
				<h3>{product}</h3>
				<p>{price}</p>
			</div>
		</Block>
	)
}

export default Card
