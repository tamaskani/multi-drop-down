import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.iconButton} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
