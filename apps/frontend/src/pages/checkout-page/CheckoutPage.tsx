import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { Pamphlet } from '@app/pamphlet';
import { Button } from '@app/button';
import { CartItemRow } from '@app/cart-drawer';
import { getCartTotal } from '../../core/cart/cart.utils';
import { Link } from 'react-router-dom';
import stripeLogo from '../../assets/images/stripe-logo.png';
import { useCartStore } from '../../core/cart/cart.store';

export function CheckoutPage() {
	const items = useCartStore((state) => state.items);
	const changeQuantity = useCartStore((state) => state.changeQuantity);

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
					variant='order'
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
								showRemove
							/>
						))}
					</ul>
					<Link
						to='/menu'
						className='mt-4 inline-block text-xs font-bold hover:underline focus:visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-strong'>
						Lägg till något mer
					</Link>
				</Pamphlet>

				<div className='lg:sticky lg:top-6'>
					<Pamphlet title='Att betala' variant='summary'>
						<div className='space-y-4'>
							<div className='flex items-baseline justify-between gap-4'>
								<span className='font-bold'>Totalt</span>
								<span className='font-alfa-slab-one text-2xl text-brand-primary'>
									{getCartTotal(items)} kr
								</span>
							</div>

							<Button className='w-full'>Fortsätt till betalning</Button>

							<div className='flex items-center gap-3'>
								<img
									src={stripeLogo}
									alt='Stripe'
									className='h-9 w-auto shrink-0'
								/>
								<p className='text-xs leading-relaxed text-text-secpndary'>
									Du skickas vidare till Stripes säkra betalningssida.
								</p>
							</div>
						</div>
					</Pamphlet>
				</div>
			</div>
		</Section>
	);
}
