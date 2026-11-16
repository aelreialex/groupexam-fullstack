import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'primary' | 'secondary';
};
