import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";
import StaffLayout from "./layouts/StaffLayout";

import { CartProvider } from './core/cart/CartProvider';
import { HomePage } from '@app/home-page';
import { MenuPage } from '@app/menu-page';
import { CheckoutPage } from '@app/checkout-page';
import { PaymentResultPage } from '@app/payment-result-page';
import { StaffOrdersPage } from '@app/staff-orders-page';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<CartProvider>
				<CustomerLayout />
			</CartProvider>
		),
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/menu',
				element: <MenuPage />,
			},
			{
				path: '/checkout',
				element: <CheckoutPage />,
			},
			{
				path: '/checkout/success',
				element: <PaymentResultPage status='success' />,
			},
			{
				path: '/checkout/cancel',
				element: <PaymentResultPage status='cancel' />,
			},
		],
	},
	{
		path: '/staff',
		element: <StaffLayout />,
		children: [
			{
				path: 'orders',
				element: <StaffOrdersPage />,
			},
		],
	},
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
