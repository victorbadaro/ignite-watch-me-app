import { type ButtonHTMLAttributes, memo } from 'react';

import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	selected?: boolean;
}

function ButtonComponent({ selected = false, children, ...rest }: ButtonProps) {
	return (
		<button {...(selected && { className: 'selected' })} {...rest}>
			{children}
		</button>
	);
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => prevProps.selected === nextProps.selected);
