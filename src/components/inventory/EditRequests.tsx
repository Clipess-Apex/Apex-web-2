import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../styles/inventory/RequestForm.css'; 
import axios from 'axios';
import InputField from './InputField';
import DisplayValue from './DisplayValue';
import AdvancedButton from './AdvancedButton';
import InventoryTypeSelect from './InventoryTypeFilter';

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}

interface Props {
    inventoryType: string;
    inventory: string;
    InventoryTypeId: number;
    selectedEditId: number;
    message: string;
    reason: string;
    handleClose: () => void;
    //onAdd: () => void;
}


const CardComponent: React.FC<Props> = ({
    inventoryType,
    inventory,
    InventoryTypeId,
    message,
    selectedEditId,
    reason,
    handleClose,
    //onAdd
}) => {
    const [values, setValues] = useState({
        InventoryType: inventoryType,
        Inventory: inventory,
        InventoryTypeId: InventoryTypeId,
        Message: message,
        Reason: reason
    });

    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(InventoryTypeId);
    const [messageError, setMessageError] = useState<string>('');
    const [inventoryNameError, setInventoryNameError] = useState<string>('');
    const [inventoryTypeName, setInventoryTypeName] = useState<string>(inventoryType);
    const [inventoryTypeError, setInventoryTypeError] = useState<string>('');
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(true);
    const [selectedRequestDetails, setSelectedRequestDetails] = useState<Request | null>(null);
    useEffect(() => {
        fetchInventoryTypes();
    }, []);

    useEffect(() => {
       
        fetchRequestDetails();
        
    }, [ selectedRequestDetails]);

   

    useEffect(() => {
        setDisabledSubmitButton(
            !!inventoryNameError || !!messageError || !!inventoryTypeError
        );
    }, [inventoryNameError, messageError, inventoryTypeError]);

    useEffect(() => {
        setValues({
            InventoryType: inventoryType,
            Inventory: inventory,
            InventoryTypeId: InventoryTypeId,
            Message: message,
            Reason: reason
        });
        setSelectedInventoryTypeId(InventoryTypeId);
        setInventoryTypeName(inventoryType);
    }, [inventoryType, inventory, InventoryTypeId, message, reason]);

    const fetchRequestDetails = async () => {
        try {
          const url3 = `https://localhost:7166/api/request/requestby/${selectedEditId}`;
          const response = await fetch(url3);
          if (!response.ok) {
            throw new Error('Failed to fetch inventory request details');
          }
          const data: Request = await response.json();
          setSelectedRequestDetails(data);
        } catch (error) {
          console.error('Error fetching inventory request details:', error);
        }
      };

    const fetchInventoryTypes = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/inventory_type/inventory_types');
            if (!response.ok) {
                throw new Error('Failed to fetch inventory types');
            }
            const data = await response.json();
            setInventoryTypes(data);
        } catch (error) {
            console.error('Error fetching inventory types:', error);
        }
    };

    const messageValidate = (message: string): string => {
        if (message.trim().length > 150) {
            return "Message must be less than 150 characters";
        } else {
            return "";
        }
    };

    const inventoryNameValidate = (inventory: string): string => {
        if (!inventory.trim()) {
            return "* This field cannot be empty";
        } else if (inventory.trim().length > 30) {
            return "* Inventory Name must be less than 30 characters";
        } else {
            return "";
        }
    };

    const handleChangeInventoryName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValues(prevValues => ({ ...prevValues, Inventory: value }));
        const validateError = inventoryNameValidate(value);
        setInventoryNameError(validateError);
        setDisabledSubmitButton(!!validateError || !!messageError || !!inventoryTypeError);
    };

    const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues(prevValues => ({ ...prevValues, Message: value }));
        const validateError = messageValidate(value);
        setMessageError(validateError);
        setDisabledSubmitButton(!!validateError || !!inventoryNameError || !!inventoryTypeError);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nameError = inventoryNameValidate(values.Inventory);
        const msgError = messageValidate(values.Message);
        const inventoryTypeError = inventoryTypeName ? "" : "* Inventory type field cannot be empty";

        setInventoryNameError(nameError);
        setInventoryTypeError(inventoryTypeError);
        setMessageError(msgError);

        if (nameError || msgError || inventoryTypeError) {
            setDisabledSubmitButton(true);
            return;
        }

        try {
            const otherData = {
                InventoryTypeId: selectedInventoryTypeId,
                Inventory: values.Inventory,
                Message: values.Message,
                Reason: values.Reason
            };

            const res = await axios.put(`https://localhost:7166/api/Request/updateEmployeeRequest/${selectedEditId}`, otherData);
            console.log(res);
            //onAdd();
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
        const selectedTypeName = inventoryTypes.find(type => type.inventoryTypeId === selectedInventoryTypeId);
        if (selectedTypeName) {
            setValues(prevState => ({
                ...prevState,
                InventoryType: selectedTypeName.inventoryTypeName,
            }));
        }
        setInventoryTypeName(selectedTypeName?.inventoryTypeName || '');
        setInventoryTypeError(selectedTypeName ? '' : "* Inventory type field cannot be empty");
        setDisabledSubmitButton(!selectedTypeName || !!inventoryNameError || !!messageError);
    };

    return (
        <div className="popup-requestForm">
            <div className="popup-inner-requestForm">
                <div className='InventorySelect-requestForm'>
                    <InventoryTypeSelect
                        inventoryTypes={inventoryTypes}
                        selectedInventoryTypeId={selectedInventoryTypeId}
                        handleInventoryTypeChange={handleInventoryTypeChange}
                        AllOrNone="None"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <h3 className='heading-requestForm'>Update Inventory</h3>
                    <div className='Inventoryname-requestForm'>
                        <InputField
                            placeholder="Enter Inventory Name"
                            value={values.Inventory}
                            onChange={handleChangeInventoryName}
                        />
                        <div className='Inventoryname-requestForm-Error'>
                            <label>{inventoryNameError}</label>
                        </div>
                    </div>
                    
                    <div className='InventoryType-fill-requestForm'>
                        <DisplayValue
                            placeholder="Selected Inventory Type"
                            value={values.InventoryType}
                            
                        />
                        <div className='InventoryType-requestForm-Error-inEdit'>
                            <label>{inventoryTypeError}</label>
                        </div>
                    </div>
                    
                    <div className='massage-requestForm'>
                        <textarea
                            id="message"
                            name="Message"
                            value={values.Message}
                            onChange={handleChangeMessage}
                            rows={5}
                            cols={40}
                            placeholder="Enter your message here"
                        />
                        <div className='message-requestForm-Error'>
                            <label>{messageError}</label>
                        </div>
                    </div>
                    
                    <div className="submitButton-requestForm" style={{position:"relative",top:"-10px"}}>
                        <AdvancedButton type="submit" disabled={disabledSubmitButton}>Submit</AdvancedButton>
                    </div>
                    <div className="closeButton-requestForm" style={{position:"relative",bottom:"70px"}}>
                        <AdvancedButton onClick={handleClose} type="button">Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CardComponent;
