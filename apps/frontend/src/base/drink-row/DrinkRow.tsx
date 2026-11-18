import type { Product } from '@app/shared';
import { Counter } from '@app/counter';

type DrinkRowProps = {
	product: Product;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
};

export function DrinkRow({
	product,
	quantity,
	onQuantityChange,
}: DrinkRowProps) {
	return (
		<div
			className='
        flex flex-col
        gap-3 py-4
        border-b border-border-subtlelast:border-b-0
        sm:flex-row sm:items-center sm: justify-between'>
			<div className='min-w-0'>
				<h3 className='font-bold'>{product.name}</h3>

				{product.description && (
					<p className='text-sm text-text-secondary'>{product.description}</p>
				)}
			</div>

			<div className='flex shrink-0 items-center gap-4'>
				<p className='text-sm font-bold'>{product.price} kr</p>

				<Counter
					value={quantity}
					onChange={onQuantityChange}
					disabled={!product.inStock}
				/>
			</div>
		</div>
	);
}
