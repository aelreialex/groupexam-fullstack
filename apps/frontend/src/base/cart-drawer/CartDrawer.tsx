import { X } from 'lucide-react';

type CartDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50'>
			<div className='absolute inset-0 bg-black/50' onClick={onClose} />

			<aside
				className='
            absolute inset-y-0 right-0
            w-full max-w-sm overflow-y-auto
            border-l border-border-strong bg-bg-surface
            p-6'>
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

					<button className='cursor-pointer p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ouline-border-strong'>
						<X size={20} aria-hidden='true' />
					</button>
				</div>
			</aside>
		</div>
	);
}
