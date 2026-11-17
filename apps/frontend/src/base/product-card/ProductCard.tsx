type ProductCardProps = {
	name: string;
	price: number;
};

export function ProductCard({ name, price }: ProductCardProps) {
	return (
		<article>
			<h2>{name}</h2>
			<p>{price} kr</p>
		</article>
	);
}
