import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Logo.svg';
import { Button } from '@app/button';
import { ShoppingBag } from 'lucide-react';

type HeaderProps = {
	onOpenCart: () => void;
	cartQuantity: number;
};

export function Header({ onOpenCart, cartQuantity }: HeaderProps) {
	return (
		<header className='w-full border-b border-border-strong'>
			<div
				className={`
          mx-auto grid max-w-6xl grid-cols-2 items-center gap-4
          px-4 py-2 sm:grid-cols-3
        `}>
				<img src={logo} alt='Nisses Korvmoj' className='w-32' />

				<div className='col-start-2 flex justify-end sm:col-start-3'>
					<Button
						variant='primary'
						aria-label={`Öppna varukorgen, ${cartQuantity} produkter`}
						onClick={onOpenCart}>
						<ShoppingBag size={20} />
						<span>{cartQuantity}</span>
					</Button>
				</div>

				<nav
					className={`
            col-span-2 flex items-center gap-6
            sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-center
          `}>
					<NavLink
						to='/'
						end
						className={({ isActive }) => `
                          text-base font-semibold hover:border-b
                          ${isActive ? 'border-b text-brand-primary' : ''}
                        `}>
						Hem
					</NavLink>

					<NavLink
						to='/menu'
						className={({ isActive }) => `
              text-base font-semibold hover:border-b
              ${isActive ? 'border-b text-brand-primary' : ''}
            `}>
						Meny
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
