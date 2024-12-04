import type { ButtonHTMLAttributes } from 'react';

import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	selected?: boolean;
}

export function Button({ selected = false, children, ...rest }: ButtonProps) {
	return (
		<button {...(selected && { className: 'selected' })} {...rest}>
			{children}
		</button>
	);
}
