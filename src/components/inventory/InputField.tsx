import React, { ChangeEvent } from 'react';


interface Props {
    placeholder: string;
    value: string;
    width?:string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void; 
}

const InputField: React.FC<Props> = ({ placeholder, value, onChange,width }) => {
    return (
        <div className="inputBox">
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} width={width} style={{border:"2px solid #00A7A7",}}/> 
        </div>
    );
};

export default InputField;

