import type { Product } from '@app/shared';
import { Button } from '@app/button';
import { useId, useState } from 'react';
import { useCart } from '../../core/cart/CartProvider';

type ProductCardProps = {
	product: Product;
	imageSrc: string;
	imageAlt: string;
};

export function ProductCard({ product, imageSrc, imageAlt }: ProductCardProps) {
	const { name, price, description, nisseQuote } = product;
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
	const [selectedCondimentIds, setSelectedCondimentIds] = useState<string[]>(
		[],
	);
	const extrasId = useId();
	const { addItem } = useCart();

	function toggleExtra(extraId: string) {
		setSelectedExtraIds((currentIds) =>
			currentIds.includes(extraId)
				? currentIds.filter((id) => id !== extraId)
				: [...currentIds, extraId],
		);
	}

	function toggleCondiment(condimentId: string) {
		setSelectedCondimentIds((currentIds) =>
			currentIds.includes(condimentId)
				? currentIds.filter((id) => id !== condimentId)
				: [...currentIds, condimentId],
		);
	}

	function handleAddToCart() {
		const selectedExtras = product.extras.filter(
			(extra) => selectedExtraIds.includes(extra._id) && extra.inStock,
		);

		const selectedCondiments = product.condiments.filter(
			(condiment) =>
				selectedCondimentIds.includes(condiment._id) && condiment.inStock,
		);

		addItem(product, selectedExtras, selectedCondiments);
		setSelectedExtraIds([]);
		setSelectedCondimentIds([]);
		setIsExpanded(false);
	}

	return (
		<article
			className='
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
			<div className='space-y-3 p-4'>
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

				<div className='border-y border-dashed border-border-subtle'>
					<button
						type='button'
						aria-expanded={isExpanded}
						aria-controls={extrasId}
						onClick={() => setIsExpanded((current) => !current)}
						className='
						flex w-full
						cursor-pointer
						items-center justify-between
						gap-4 py-3
						text-left text-sm font-bold
						focus-visible:outline-2
						focus-visible:outline-offset-2
						focus-visible:outline-border-strong'>
						<span>Välj tillbehör</span>
						<span aria-hidden='true'>{isExpanded ? '-' : '+'}</span>
					</button>

					<div id={extrasId} hidden={!isExpanded} className='space-y-2 pb-3'>
						{product.extras.map((extra) => (
							<label
								key={extra._id}
								className='flex items-center gap-2 text-sm'>
								<input
									type='checkbox'
									checked={selectedExtraIds.includes(extra._id)}
									onChange={() => toggleExtra(extra._id)}
									disabled={!extra.inStock}
									className='size-4 accent-brand-primary'
								/>

								<span className='flex-1'>{extra.name}</span>
								<span>{extra.inStock ? `+${extra.price} kr` : 'Slut'}</span>
							</label>
						))}

						{product.condiments.length > 0 && (
							<>
								<h3 className='pt-3 font-bold text-sm'>Såser och dressingar</h3>

								{product.condiments.map((condiment) => (
									<label
										key={condiment._id}
										className='flex items-center gap-2 text-sm'>
										<input
											type='checkbox'
											checked={selectedCondimentIds.includes(condiment._id)}
											onChange={() => toggleCondiment(condiment._id)}
											disabled={!condiment.inStock}
											className='size-4 accent-brand-primary'
										/>

										<span className='flex-1'>{condiment.name}</span>
										<span>
											{condiment.inStock
												? condiment.price === 0
													? 'Ingår'
													: `${condiment.price} kr`
												: 'Slut'}
										</span>
									</label>
								))}
							</>
						)}
					</div>
				</div>
				<Button onClick={handleAddToCart} disabled={!product.inStock}>
					Lägg till
				</Button>
			</div>
		</article>
	);
}
