import type { ReactNode } from 'react';

type PamphletProps = {
	title: string;
	children: ReactNode;
	contentClassName?: string;
};

export function Pamphlet({ title, children, contentClassName }: PamphletProps) {
	return (
		<article
			className='
        p-8 border-4 border-border-pamphlet 
        bg-bg-surface
        shadow-[0_10px_24px_-14px_#382b22]
      '>
			<div className={`flex flex-col gap-4 ${contentClassName ?? ''}`}>
				<h2 className='font-alfa-slab-one text-lg text-brand-primary'>
					{title}
				</h2>

				<section>{children}</section>
			</div>
		</article>
	);
}
