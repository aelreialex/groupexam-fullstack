import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CustomerLayout from './layouts/CustomerLayout';
import StaffLayout from './layouts/StaffLayout';

import { HomePage } from '@app/home-page';
import { MenuPage } from '@app/menu-page';
import { CheckoutPage } from '@app/checkout-page';
import { PaymentResultPage } from '@app/payment-result-page';
import { StaffPage } from '@app/staff-page';
import { StaffOrdersPage } from '@app/staff-orders-page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <CustomerLayout />,
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
				index: true,
				element: <StaffPage />,
			},
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
