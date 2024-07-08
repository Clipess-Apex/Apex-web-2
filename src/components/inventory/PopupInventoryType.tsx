
import React, { useState, FormEvent, useEffect } from 'react';
import '../../styles/inventory/PopupType.css';
import axios from 'axios';
import InputField from './InputField';
import AdvancedButton from './AdvancedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    handleClose: () => void;
}

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
    createdBy: number;
    deletedBy: number;
}

const CardComponent: React.FC<Props> = ({ handleClose }) => {
    const [inventoryTypeName, setInventoryType] = useState('');
    const [InventoryNameValidationError, setInventoryNameValidationError] = useState<string>('');
    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);

    useEffect(() => {
        fetchInventoryTypes();
    }, []);

    const fetchInventoryTypes = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/inventory_type/inventory_types');
            if (!response.ok) {
                throw new Error('Failed to fetch inventory types');
            }
            const data: InventoryType[] = await response.json();
            setInventoryTypes(data);
        } catch (error) {
            console.error('Error fetching inventory types:', error);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!inventoryTypeName.trim()) {
                setInventoryNameValidationError("* Inventory Type name cannot be empty");
                return; // To Prevent further execution if inventory name is empty
            } else if (inventoryTypeName.trim().length > 60) {
                setInventoryNameValidationError("* Inventory name must be less than 60 characters");
                return; // To Prevent further execution if inventory name exceeds 60 characters
            } else {
                setInventoryNameValidationError("");
            }
            const inventoryExists = inventoryTypes.some(
                (type) => type.inventoryTypeName.toLowerCase() === inventoryTypeName.toLowerCase()
            );

            if (inventoryExists) {
                setInventoryNameValidationError("Inventory name already exists");
                return;
            }
            const data = {
                inventoryTypeName: inventoryTypeName,
                createdBy: 8
            };
            const response = await axios.post("https://localhost:7166/api/inventory_type/add", data);

            console.log('Inventory created successfully:', response.data);
            toast.success('Inventory created successfully');

            // Directly update the inventoryTypes state
            setInventoryTypes(prevInventoryTypes => [...prevInventoryTypes, response.data]);

            handleClose(); // Close the popup after successful submission
            
        } catch (err) {
            console.error('Error creating inventory:', err);
            toast.error('Error creating inventory');
        }
    };

    const handleInventoryTypeChange = (value: string) => {
        setInventoryType(value);
    };

    return (
        <div className="popup-inventorytype">
            <div className="popup-inner-inventorytype">
                <form onSubmit={handleSubmit}>
                    <h3 className='Add-InventoryType-heading'>Add Inventory Type</h3>

                    <div className='InventoryTypename-inventorytype'>
                        <InputField
                            placeholder="Enter Inventory Type"
                            value={inventoryTypeName}
                            onChange={(e) => handleInventoryTypeChange(e.target.value)}
                        />
                    </div>

                    <div className='InventoryTypeNameError'>
                        <label >{InventoryNameValidationError}</label>
                    </div>

                    <div className="button-submit-inventorytype">
                        <AdvancedButton type="submit">Submit</AdvancedButton>
                    </div>
                    
                    <div className="button-close-inventorytype">
                        <AdvancedButton type="button" onClick={handleClose}>Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CardComponent;


