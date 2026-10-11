import { m, type HTMLMotionProps } from 'motion/react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
}

const hover = { scale: 1.05, y: -2 };
const tap = { scale: 0.96, y: 0 };
const spring = { type: 'spring', stiffness: 400, damping: 20 } as const;

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ');

  return (
    <m.button
      type={type}
      className={classes}
      disabled={disabled}
      whileHover={disabled ? undefined : hover}
      whileTap={disabled ? undefined : tap}
      transition={spring}
      {...props}
    />
  );
}
