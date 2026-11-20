import { Outlet } from 'react-router-dom';
import { Header } from '@app/header';
import { Footer } from '@app/footer';
import { useState } from 'react';
import { CartDrawer } from '@app/cart-drawer';
import { useCart } from '../core/cart/CartProvider';

function CustomerLayout() {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const { items: cartItems, changeQuantity } = useCart();

	const cartQuantity = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);

	return (
		<div className='flex flex-col min-h-screen'>
			<Header
				onOpenCart={() => setIsCartOpen(true)}
				cartQuantity={cartQuantity}
			/>

			<CartDrawer
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				items={cartItems}
				onQuantityChange={changeQuantity}
			/>

			<main className='w-full flex-1'>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default CustomerLayout;
