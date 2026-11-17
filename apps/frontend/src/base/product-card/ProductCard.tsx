type ProductCardProps = {
	name: string;
	price: number;
	description: string;
	comment?: string;
	imageSrc: string;
	imageAlt: string;
};

export function ProductCard({
	name,
	price,
	description,
	comment,
	imageSrc,
	imageAlt,
}: ProductCardProps) {
	return (
		<article>
			<img src={imageSrc} alt={imageAlt} />
			<h2>{name}</h2>
			<p>{price} kr</p>
			<p>{description}</p>
			{comment && <p>Nisse: "{comment}"</p>}
		</article>
	);
}
