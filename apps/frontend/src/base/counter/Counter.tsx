type CounterProps = {
	value: number;
	onChange: (value: number) => void;
	disabled?: boolean;
	max?: number;
};

export function Counter({
	value,
	onChange,
	disabled = false,
	max = 99,
}: CounterProps) {
	const decrease = () => onChange(Math.max(0, value - 1));
	const increase = () => onChange(Math.min(max, value + 1));

	return (
		<div
			className={`
        inline-flex items-stretch
        border-2 border-border-strong rounded-md
        bg-bg-surface
        shadow-[0_3px_0_var(--color-border-strong)]
      `}>
			<button
				type='button'
				onClick={decrease}
				disabled={disabled || value <= 0}
				className={`
          px-4 py-2 font-bold
          hover:bg-interactive-hover
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-border-strong
          active:shadow-none
          disabled:opacity-[0.28] disabled:cursor-not-allowed
          disabled:hover:bg-transparent
          cursor-pointer
        `}>
				−
			</button>

			<span className='min-w-8 px-2 flex items-center justify-center font-semibold text-sm'>
				{value}
			</span>

			<button
				type='button'
				onClick={increase}
				disabled={disabled || value >= max}
				className={`
          px-4 py-2 font-bold
          hover:bg-interactive-hover
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-border-strong
          active:shadow-none
          disabled:opacity-[0.28] disabled:cursor-not-allowed
          disabled:hover:bg-transparent
          cursor-pointer
        `}>
				+
			</button>
		</div>
	);
}
