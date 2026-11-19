import { Outlet } from 'react-router-dom';
import { Header } from '@app/header';
import { Footer } from '@app/footer';
import { useState } from 'react';
import { CartDrawer } from '@app/cart-drawer';
import type { CartItem } from '../core/cart/cart.types.ts';
import { mockCartItems } from '../core/cart/cart.mock';
function CustomerLayout() {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

	function handleQuantityChange(id: string, quantity: number) {
		setCartItems((currentItems) =>
			currentItems
				.map((item) => (item.id === id ? { ...item, quantity } : item))
				.filter((item) => item.quantity > 0),
		);
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<Header onOpenCart={() => setIsCartOpen(true)} />

			<CartDrawer
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				items={cartItems}
				onQuantityChange={handleQuantityChange}
			/>

			<main className='w-full flex-1'>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default CustomerLayout;
