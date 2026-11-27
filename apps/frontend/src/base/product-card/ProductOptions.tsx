import type { Product } from '@app/shared';
import {
	MAX_EXTRAS_PER_MEAL,
	MAX_CONDIMENTS_PER_MEAL,
} from '../../core/cart/cart.constants';

type ProductOptionsProps = {
	product: Product;
	isExpanded: boolean;
	extrasId: string;
	onToggleExpanded: () => void;
	selectedExtraIds: string[];
	selectedCondimentIds: string[];
	toggleExtra: (id: string) => void;
	toggleCondiment: (id: string) => void;
	alwaysExpanded?: boolean;
};

export function ProductOptions({
	product,
	isExpanded,
	extrasId,
	onToggleExpanded,
	selectedExtraIds,
	selectedCondimentIds,
	toggleExtra,
	toggleCondiment,
	alwaysExpanded = false,
}: ProductOptionsProps) {
	return (
		<div className='border-y border-dashed border-border-subtle'>
			{!alwaysExpanded && (
				<button
					type='button'
					aria-expanded={isExpanded}
					aria-controls={extrasId}
					onClick={onToggleExpanded}
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
			)}

			<div
				id={extrasId}
				hidden={!alwaysExpanded && !isExpanded}
				className={`space-y-2 overflow-y-auto pr-2 pl-0.25 ${alwaysExpanded ? 'max-h-32 py-3' : 'max-h-48 pb-3 '}`}>
				{product.extras.map((extra) => (
					<label key={extra._id} className='flex items-center gap-2 text-sm'>
						<input
							type='checkbox'
							checked={selectedExtraIds.includes(extra._id)}
							onChange={() => toggleExtra(extra._id)}
							disabled={
								!extra.inStock ||
								(selectedExtraIds.length >= MAX_EXTRAS_PER_MEAL &&
									!selectedExtraIds.includes(extra._id))
							}
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
									disabled={
										!condiment.inStock ||
										(selectedCondimentIds.length >= MAX_CONDIMENTS_PER_MEAL &&
											!selectedCondimentIds.includes(condiment._id))
									}
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
	);
}
