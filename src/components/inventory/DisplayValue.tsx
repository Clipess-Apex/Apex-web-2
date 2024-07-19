import React, { ChangeEvent } from 'react';
import '../../styles/inventory/DisplayValue.css';

interface Props {
    value: string;
    width?:string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DisplayValue: React.FC<Props> = ({ value, placeholder, onChange,width }) => {
    return (
        <div className="inputBox">
            <input type="text" value={value} readOnly onChange={onChange} width={width} />
            <span>{placeholder}</span>
        </div>
    );
};

export default DisplayValue;




