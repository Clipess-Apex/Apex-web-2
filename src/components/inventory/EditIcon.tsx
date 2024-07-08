import React from 'react';

interface Props {
  size: string;
  color:string;
}

const EditIcon: React.FC<Props> = ({ size,color }) => {
  const iconStyle: React.CSSProperties = {
    fontSize: size,
    color:color
};

  return <i className="fas fa-edit" style={iconStyle}></i>;
};

export default EditIcon;
