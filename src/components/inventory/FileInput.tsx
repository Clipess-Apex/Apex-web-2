import React, { ChangeEvent } from 'react';
import '../../styles/inventory/FileInput.css';

interface Props {
    button_label_1: string;
    button_label_2: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    

}

const FileInput: React.FC<Props> = ({ button_label_1, onChange, button_label_2 }) => {
    return (
        <div className='FileInput'>
            <div>
                <label htmlFor="fileInput" className="custom-file-upload">
                    {button_label_1}
                </label>
            </div>
            <input
                type="file"
                id="fileInput"
                onChange={onChange}
                style={{ display: "none", border: "2px solid #d44694" }}
            />
            <input
                type='text'
                id="fileInputDisplay"
                readOnly
                value={button_label_2}
                className="custom-file-upload2"
                style={{ border: "2px solid #d44694"}}
            />
        </div>
    );
}

export default FileInput;

