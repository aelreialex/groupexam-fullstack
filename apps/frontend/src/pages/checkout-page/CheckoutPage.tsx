import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { Pamphlet } from '@app/pamphlet';
import { Button } from '@app/button';
import { CartItemRow } from '@app/cart-drawer';
import { useCart } from '../../core/cart/CartProvider';
import { getCartTotal } from '../../core/cart/cart.utils';

export function CheckoutPage() {
	const { items, changeQuantity } = useCart();

	const quantity = items.reduce((total, item) => total + item.quantity, 0);

	return (
		<Section>
			<div className='mb-8 space-y-3'>
				<SectionTitle as='h1' eyebrow='Sista stoppet före betalning'>
					Checkout
				</SectionTitle>

				<p className='font-kalam'>
					Se över beställningen. Nisse börjar inte grilla förrän du har betalat.
				</p>
			</div>

			<div className='grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
				<Pamphlet
					title='Din beställning'
					headerAside={
						<span className='shrink-0 text-xs font-bold uppercase'>
							{quantity} {quantity === 1 ? 'vara' : 'varor'}
						</span>
					}>
					<ul className='divide-y divide-dashed divide-border-subtle'>
						{items.map((item) => (
							<CartItemRow
								key={item.id}
								item={item}
								onQuantityChange={changeQuantity}
							/>
						))}
					</ul>
				</Pamphlet>

				<Pamphlet title='Att betala'>
					<div className='space-y-4'>
						<div className='flex items-baseline justify-between gap-4'>
							<span className='font-bold'>Totalt</span>
							<span className='font-alfa-slab-one text-2xl text-brand-primary'>
								{getCartTotal(items)} kr
							</span>
						</div>

						<Button className='w-full'>Fortsätt till betalning</Button>
					</div>
				</Pamphlet>
			</div>
		</Section>
	);
}
