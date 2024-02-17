const Card = ({ className, name }: { className?: string; name: string }) => {
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
export default Card
