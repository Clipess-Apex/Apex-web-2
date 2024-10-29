import React, { useState, FormEvent, ChangeEvent } from 'react';
import '../../styles/inventory/EditInventoryType.css';
import axios from 'axios';
import InputField from './InputField';
import AdvancedButton from './AdvancedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    handleClose: () => void;
    selectedEditId: number;
    inventoryTypeName: string;
}

const CardComponent_Type: React.FC<Props> = ({ handleClose, selectedEditId, inventoryTypeName }) => {
    const [editedInventoryType, setEditedInventoryType] = useState<string>(inventoryTypeName);
    const [inventoryNameValidationError, setInventoryNameValidationError] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditedInventoryType(event.target.value);
        if (!event.target.value.trim()) {
            setInventoryNameValidationError("* Inventory name cannot be empty");
        } else if (event.target.value.trim().length > 60) {
            setInventoryNameValidationError("* Inventory name must be less than 60 characters");
        } else {
            setInventoryNameValidationError("");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editedInventoryType.trim()) {
            setInventoryNameValidationError("* Inventory name cannot be empty");
            return;
        } else if (editedInventoryType.trim().length > 60) {
            setInventoryNameValidationError("* Inventory name must be less than 60 characters");
            return;
        } else {
            setInventoryNameValidationError("");
        }
        try {
            const data = {
                inventoryTypeName: editedInventoryType,
            };
            const response = await axios.put(`https://localhost:7166/api/inventory_type/update/${selectedEditId}`, data);
            console.log('Inventory updated successfully:', response.data);
            toast.success('Inventory updated successfully');
            handleClose(); // Close the popup after successful submission
        } catch (err) {
            console.error('Error updating inventory:', err);
            toast.error('Error updating inventory');
        }
    };

    return (
        <div className="popup-editInventoryType">
            <div className="popup-inner-editInventoryType">
                <form onSubmit={handleSubmit}>
                    <h3 className='edit-InventoryType-heading'>Edit Inventory Type</h3>
                    <div className='InventoryTypename-edittype'>
                        <InputField
                            placeholder="Enter Inventory Type"
                            value={editedInventoryType}
                            onChange={handleChange}
                        />
                    </div>
                    <label className='InventoryTypeEditNameError'>{inventoryNameValidationError}</label>
                    <div className="button-submit-edittype">
                        <AdvancedButton type="submit">Submit</AdvancedButton>
                    </div>
                    <div className="button-close-edittype">
                        <AdvancedButton type="button" onClick={handleClose}>Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CardComponent_Type;


