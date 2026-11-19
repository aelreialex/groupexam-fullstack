import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { CartItem } from '../../core/cart/cart.types';
import { CartEmptyState } from './CartEmptyState';
import { CartItemRow } from './CartItemRow';

type CartDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	items: CartItem[];
	onQuantityChange: (id: string, quantity: number) => void;
};

export function CartDrawer({
	isOpen,
	onClose,
	items,
	onQuantityChange,
}: CartDrawerProps) {
	const navigate = useNavigate();

	function goToMenu() {
		onClose();
		navigate('/menu');
	}

	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const previousFocus = document.activeElement;

		closeButtonRef.current?.focus();

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);

			if (previousFocus instanceof HTMLElement) {
				previousFocus.focus();
			}
		};
	}, [isOpen, onClose]);

	return (
		<div
			inert={!isOpen}
			className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
			<div
				className={`absolute inset-0 bg-black/50 motion-safe:transition-opacity motion-safe:duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
				onClick={onClose}
			/>

			<aside
				className={`
            absolute inset-y-0 right-0
            w-full max-w-sm overflow-y-auto
            border-l border-border-strong 
            bg-bg-surface p-6
            motion-safe:transition-transform motion-safe:duration-300
            ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
				<div
					className='
                flex
                items-center justify-between
                gap-4
                border-b border-border-strong
                pb-4'>
					<h2 className='font-alfa-slab-one text-2xl text-brand-primary'>
						Din beställning
					</h2>

					<button
						type='button'
						ref={closeButtonRef}
						onClick={onClose}
						aria-label='Stäng varukorgen'
						className='cursor-pointer p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-strong'>
						<X size={20} aria-hidden='true' />
					</button>
				</div>

				{items.length === 0 ? (
					<CartEmptyState onGoToMenu={goToMenu} />
				) : (
					<ul className='divide-y divide-dashed divide-border-subtle'>
						{items.map((item) => (
							<CartItemRow
								key={item.id}
								item={item}
								onQuantityChange={onQuantityChange}
							/>
						))}
					</ul>
				)}
			</aside>
		</div>
	);
}
