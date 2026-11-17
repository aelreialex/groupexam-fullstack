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
		<article
			className='
			overflow-hidden
			rounded-sm
			border
			shadow-sm
			'>
			<img
				src={imageSrc}
				alt={imageAlt}
				className='
			aspect-4/3
			w-full
			object-cover
			'
			/>
			<h2>{name}</h2>
			<p>{price} kr</p>
			<p>{description}</p>
			{comment && <p>Nisse: "{comment}"</p>}
		</article>
	);
}
