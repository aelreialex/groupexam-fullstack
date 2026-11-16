import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'primary' | 'secondary';
};

export function Button({
	variant = 'primary',
	type = 'button',
	children,
	className,
	...props
}: ButtonProps) {
	const variantClasses = {
		primary: 'bg-interactive-primary',
		secondary: 'bg-bg-surface',
	};

	return (
		<button
			type={type}
			className={`
                inline-flex items-center justify-center gap-2
                px-4 py-2
                text-text-primary font-bold
                border-2 border-border-strong rounded-sm
                shadow-[3px_3px_0_var(--color-border-strong)]
                enabled:hover:shadow-[4px_4px_0_var(--color-border-strong)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-border-strong
                enabled:active:shadow-none
                disabled:opacity-[0.28] disabled:shadow-none disabled:cursor-not-allowed
                font-archivo
                cursor-pointer
                ${variantClasses[variant]} 
                ${className ?? ''}
                `}
			{...props}>
			{children}
		</button>
	);
}
