import type { ReactNode } from 'react';

type PamphletProps = {
	title: string;
	rotate?: boolean;
	children: ReactNode;
	contentClassName?: string;
	headerAside?: ReactNode;
	variant?: 'default' | 'summary';
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
        p-8 bg-bg-surface
        ${rotate ? 'rotate-2' : ''}
        ${
					variant === 'summary'
						? 'rounded-sm border-2 border-border-pamphlet shadow-[5px_5px_0_var(--color-border-strong)]'
						: 'border-4 border-border-pamphlet shadow-[0_10px_24px_-14px_#382b22]'
				}
      `}>
			<div className={`flex flex-col gap-4 ${contentClassName ?? ''}`}>
				{headerAside != null ? (
					<div className='flex items-center justify-between gap-4'>
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

				<section>{children}</section>
			</div>
		</article>
	);
}
