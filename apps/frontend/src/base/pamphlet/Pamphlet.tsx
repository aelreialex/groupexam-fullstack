import type { ReactNode } from 'react';

type PamphletProps = {
	title: string;
	rotate?: boolean;
	children: ReactNode;
	contentClassName?: string;
	headerAside?: ReactNode;
};

export function Pamphlet({
	title,
	rotate,
	children,
	contentClassName,
	headerAside,
}: PamphletProps) {
	return (
		<article
			className={`
        p-8 border-4 border-border-pamphlet 
        ${rotate ? 'rotate-2' : ''}
        bg-bg-surface
        shadow-[0_10px_24px_-14px_#382b22]
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
