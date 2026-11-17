import { Button } from '@app/button';
import { useId, useState } from 'react';

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
	const [isExpanded, setIsExpanded] = useState(false);
	const extrasId = useId();

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
				{comment && <p className='font-kalam text-sm'>Nisse: "{comment}"</p>}

				<div
					className='
				border-y
				border-dashed
				border-border-subtle'>
					<button
						type='button'
						aria-expanded={isExpanded}
						aria-controls={extrasId}
						onClick={() => setIsExpanded(!isExpanded)}
						className='
					flex
					w-full
					cursor-pointer
					items-center
					justify-between
					gap-4
					py-3
					text-left
					text-sm
					font-bold
					focus-visible:outline-2
					focus-visible:outline-offset-2
					focus-visible:outline-border-strong'>
						<span>Välj tillbehör</span>
						<span aria-hidden='true'>{isExpanded ? '-' : '+'}</span>
					</button>

					<div id={extrasId} hidden={!isExpanded} className='pb-3'>
						Här kommer tillbehören.
					</div>
				</div>
				<Button>Lägg till</Button>
			</div>
		</article>
	);
}
