import type { Product } from '@app/shared';
import { Button } from '@app/button';
import { useId, useState } from 'react';
import { useProductSelection } from '../../core/menu/useProductSelection';
import { ProductOptions } from './ProductOptions';

type ProductCardProps = {
	product: Product;
	imageSrc: string;
	imageAlt: string;
};

export function ProductCard({ product, imageSrc, imageAlt }: ProductCardProps) {
	const { name, price, description, nisseQuote } = product;
	const [isExpanded, setIsExpanded] = useState(false);
	const extrasId = useId();
	const {
		selectedExtraIds,
		selectedCondimentIds,
		toggleExtra,
		toggleCondiment,
		addToCart,
	} = useProductSelection(product);

	function handleAddToCart() {
		addToCart();
		setIsExpanded(false);
	}

	return (
		<article
			className='
			flex h-full flex-col
			overflow-hidden
			rounded-sm
			border
			border-border-subtle
			bg-bg-surface
			font-archivo
			text-text-primary
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
			<div className='flex flex-1 flex-col gap-3 p-4'>
				<div
					className='
				flex
				items-baseline 
				justify-between
				gap-4'>
					<h2
						className='
					min-w-0
					font-alfa-slab-one
					text-lg'>
						{name}
					</h2>
					<p
						className='
					shrink-0
					text-sm
					font-bold
					text-brand-primary'>
						{price} kr
					</p>
				</div>
				<p
					className='
				text-sm
				leading-relaxed'>
					{description}
				</p>
				{nisseQuote && (
					<p className='font-kalam text-sm'>Nisse: "{nisseQuote}"</p>
				)}
				<div className='mt-auto space-y-3'>
					<ProductOptions
						product={product}
						isExpanded={isExpanded}
						extrasId={extrasId}
						onToggleExpanded={() => setIsExpanded((current) => !current)}
						selectedExtraIds={selectedExtraIds}
						selectedCondimentIds={selectedCondimentIds}
						toggleExtra={toggleExtra}
						toggleCondiment={toggleCondiment}
					/>

					<Button onClick={handleAddToCart} disabled={!product.inStock}>
						Lägg till
					</Button>
				</div>
			</div>
		</article>
	);
}
