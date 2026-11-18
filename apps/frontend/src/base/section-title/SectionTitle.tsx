import type { ReactNode } from 'react';

type SectionTitleProps = {
	eyebrow: string;
	children: ReactNode;
	as?: 'h1' | 'h2';
};

export function SectionTitle({
	eyebrow,
	children,
	as: Heading = 'h2',
}: SectionTitleProps) {
	return (
		<div className='space-y-2 font-alfa-slab-one text-brand-primary'>
			<p className='text-xs uppercase tracking-wider'>{eyebrow}</p>

			<Heading className='text-3xl leading-tight md:text-5xl'>
				{children}
			</Heading>
		</div>
	);
}
