import React, { ReactNode } from 'react';
import '../../styles/inventory/AdvancedButton.css';

interface Props {
  children: ReactNode;
  onClick?: () => void | null;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  height?:string;
  width?:string;
}

const AdvancedButton: React.FC<Props> = ({ children, onClick, type,disabled,height,width }) => {
  return (
    <button type={type} style={{height,width}} className={`advanced-button ${disabled ? 'disable' : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default AdvancedButton;





