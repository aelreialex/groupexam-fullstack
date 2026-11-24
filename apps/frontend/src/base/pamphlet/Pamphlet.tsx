import type { ReactNode } from 'react';

type PamphletProps = {
	title?: string;
	rotate?: boolean;
	children: ReactNode;
	contentClassName?: string;
	headerAside?: ReactNode;
	variant?: 'default' | 'summary' | 'order' | 'result';
};

export function Pamphlet({
	title,
	rotate,
	children,
	contentClassName,
	headerAside,
	variant = 'default',
}: PamphletProps) {
	return (
		<article
			className={`
				bg-bg-surface
        ${rotate ? 'rotate-2' : ''}
        ${
					variant === 'summary'
						? 'p-8 rounded-sm border-2 border-border-pamphlet shadow-[5px_5px_0_var(--color-border-strong)]'
						: variant === 'order'
							? 'overflow-hidden rounded-md border border-border-subtle shadow-[0_6px_10px_-2px_var(--color-border-strong)]'
							: variant === 'result'
								? 'p-g sm:p-10 border-2 border-border-pamphlet shadow-[6px_6px_0_var(--color-border-strong)]'
								: 'p-8 border-4 border-border-pamphlet shadow-[0_10px_24px_-14px_#382b22]'
				}
      `}>
			<div
				className={`flex flex-col ${variant === 'order' ? 'gap-0' : 'gap-4'} ${contentClassName ?? ''}`}>
				{title == null ? null : headerAside != null ? (
					<div
						className={`flex items-center justify-between gap-4 ${variant === 'order' ? 'border-b-2 border-border-subtle px-5 py-4' : ''}`}>
						<h2 className='font-alfa-slab-one text-lg text-brand-primary'>
							{title}
						</h2>

						{headerAside}
					</div>
				) : (
					<h2 className='font-alfa-slab-one text-lg text-brand-primary'>
						{title}
					</h2>
				)}

				<section className={variant === 'order' ? 'px-5 pb-4' : undefined}>
					{children}
				</section>
			</div>
		</article>
	);
}
