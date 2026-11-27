import type { ReactNode } from 'react';
import { Counter } from '@app/counter';
import type { CartItem } from '../../core/cart/cart.types';
import { getUnitPrice } from '../../core/cart/cart.utils';
import {
	MAX_DRINK_QUANTITY,
	MAX_MEAL_QUANTITY,
} from '../../core/cart/cart.constants';

type CartItemRowProps = {
	item: CartItem;
	onQuantityChange: (id: string, quantity: number) => void;
	children?: ReactNode;
	showRemove?: boolean;
};

export function CartItemRow({
	item,
	onQuantityChange,
	children,
	showRemove = false,
}: CartItemRowProps) {
	const selectedIngredients = [
		...item.selectedExtras,
		...item.selectedCondiments,
	];

	return (
		<li className='py-4'>
			<div className='flex items-center justify-between gap-4 '>
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
						max={
							item.product.category === 'drink'
								? MAX_DRINK_QUANTITY
								: MAX_MEAL_QUANTITY
						}
					/>

					{showRemove && (
						<button
							type='button'
							onClick={() => onQuantityChange(item.id, 0)}
							className='mx-auto mt-2 block cursor-pointer text-xs font-bold text-brand-primary underline underline-offset-2 focus:visible:ouline-2 focus:visible:ouline-offset-4 focus-visible:outline-border-strong'>
							Ta bort
						</button>
					)}
				</div>
			</div>

			{children && <div className='mt-4'>{children}</div>}
		</li>
	);
}
