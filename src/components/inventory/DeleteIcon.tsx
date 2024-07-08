import React from 'react';

interface Props {
  size: string;
  color: string;
}

const DeleteIcon: React.FC<Props> = ({ size, color }) => {
  const iconStyle: React.CSSProperties = {
    fontSize: size,
    color: color
  };

  return <i className="fas fa-trash-alt" style={iconStyle}></i>;
};

export default DeleteIcon;
