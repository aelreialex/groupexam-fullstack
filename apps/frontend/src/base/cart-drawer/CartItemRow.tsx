import { Counter } from '@app/counter';
import type { CartItem } from '../../core/cart/cart.types';
import { getUnitPrice } from '../../core/cart/cart.utils';
import { MAX_DRINK_QUANTITY } from '../../core/cart/cart.constants';

type CartItemRowProps = {
	item: CartItem;
	onQuantityChange: (id: string, quantity: number) => void;
};

export function CartItemRow({ item, onQuantityChange }: CartItemRowProps) {
	const selectedIngredients = [
		...item.selectedExtras,
		...item.selectedCondiments,
	];

	return (
		<li className='flex items-center justify-between gap-4 py-4'>
			<div className='min-w-0'>
				<h3 className='font-semibold'>{item.product.name}</h3>

				{selectedIngredients.map((ingredient) => (
					<p key={ingredient._id} className='text-sm text-text-seconday'>
						{ingredient.name}
					</p>
				))}

				<p className='mt-1 text-sm font-bold'>
					{getUnitPrice(item) * item.quantity} kr
				</p>
			</div>

			<div className='shrink-0'>
				<Counter
					value={item.quantity}
					onChange={(quantity) => onQuantityChange(item.id, quantity)}
					max={item.product.category === 'drink' ? MAX_DRINK_QUANTITY : 99}
				/>
			</div>
		</li>
	);
}
