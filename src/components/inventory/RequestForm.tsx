// import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import InputField from './InputField';
// import DisplayValue from './DisplayValue';
// import AdvancedButton from './AdvancedButton';
// import InventoryTypeSelect from './InventoryTypeFilter';
// import '../../styles/inventory/RequestForm.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Request {
//     requestId: number;
//     employeeId: number;
//     inventoryTypeId: number;
//     message: string;
//     inventory: string;
//     isRead: boolean;
//     deleted: boolean;
//     rejected: boolean;
//     reason: string | null;
//     createdDate: string;
//     inventoryType: {
//         inventoryTypeName: string;
//     };
// }

// interface InventoryType {
//     inventoryTypeId: number;
//     inventoryTypeName: string;
// }
// const RequestForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
//     const [values, setValues] = useState<Request>({
//         requestId: 0,
//         employeeId: 0,
//         inventoryTypeId: 0,
//         message: '',
//         inventory: '',
//         isRead: false,
//         deleted: false,
//         rejected: false,
//         reason: '',
//         createdDate: '',
//         inventoryType: {
//             inventoryTypeName: ''
//         }
//     });

//     const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
//     const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(0);
//     const [messageError, setMessageError] = useState<string>('');
//     const [inventoryNameError,setInventoryNameError] = useState<string>('');
//     const [inventoryTypeName, setinventoryTypeName ] = useState<string>('');
//     const [inventoryTypeErr, setInventoryTypeError] = useState<string>('');
//     const [disabledSubmitButton,setdisabledSubmitButton] = useState<boolean>(true);
//     useEffect(() => {
//         fetchInventoryTypes();
//     }, []);

//     const fetchInventoryTypes = async () => {
//         try {
//             const response = await fetch('https://localhost:7166/api/inventory_type/inventory_types');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch inventory types');
//             }
//             const data: InventoryType[] = await response.json();
//             setInventoryTypes(data);
//         } catch (error) {
//             console.error('Error fetching inventory types:', error);
//         }
//     };
//     const messageValidate = (message:string):string => {
//             if(message.trim().length>150 ){
//                 return "Message must be les than 150 characters"
//             }
//             else{
//                 return "";
//             }
//     }

//     const InventoryNameValidate = (inventory:string):string => {
//         if(!inventory.trim()){
//             return "* This field cannot be empty";
//         }else if(inventory.trim().length>30){
//             return "* Inventory Name must be less than 30 characters"
//         }
//         else{
//             return "";
//         }
//     }

    

//     const handleChangeInventoryName = (event:ChangeEvent<HTMLInputElement>) => {
//      const value = {...values, inventory:event.target.value}
//      setValues(value);
//      const validateError =  InventoryNameValidate(value.inventory);
//      setInventoryNameError(validateError);
//      setdisabledSubmitButton(!!validateError || !!messageError || !!inventoryTypeErr);
//     }

//     const handleChangeMessage = (event:ChangeEvent<HTMLTextAreaElement>) => {
//           const value = { ...values, message: event.target.value }
//           setValues(value)
//           const validateError = messageValidate(value.message);
//           setMessageError(validateError);
//           setdisabledSubmitButton(!!validateError || !!inventoryNameError || !!inventoryTypeErr);
//     }

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const nameError = InventoryNameValidate(values.inventory);
//         const msgError = messageValidate(values.message);
//         const inventoryTypeError = inventoryTypeName ? "" : "* Inventory type field cannot be empty";
        
//         setInventoryNameError(nameError);
//         setInventoryTypeError(inventoryTypeError)
//         setMessageError(msgError);


//         if (nameError || msgError || inventoryTypeError) {
//             setdisabledSubmitButton(true);
//             return;
//         }

//        try {
//             const requestPayload = {
//                 employeeId:8,
//                 inventoryTypeId: selectedInventoryTypeId,
//                 message: values.message,
//                 inventory: values.inventory,
//                 isRead: values.isRead,
//                 deleted: values.deleted,
//                 rejected: values.rejected,
//                 reason: ''
//             };

//             const res = await axios.post("https://localhost:7166/api/request/add", requestPayload);
//             console.log(res);
//             handleClose();

//             // Reset form values
//             setValues({
//                 requestId: 0,
//                 employeeId: 0,
//                 inventoryTypeId: 0,
//                 message: '',
//                 inventory: '',
//                 isRead: false,
//                 deleted: false,
//                 rejected: false,
//                 reason: '',
//                 createdDate: '',
//                 inventoryType: {
//                     inventoryTypeName: ''
//                 }
//             });
//             toast.success('Request posted successfully');
         
//             setSelectedInventoryTypeId(0);
//             setinventoryTypeName('');
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
//         setSelectedInventoryTypeId(selectedInventoryTypeId);
//         const selectedTypeName = getInventoryTypeName(selectedInventoryTypeId);
//         setinventoryTypeName(selectedTypeName);
//         setInventoryTypeError(selectedTypeName ? '' : "* Inventory type field cannot be empty");
//         setdisabledSubmitButton(!selectedTypeName || !!inventoryNameError || !!messageError);
//     };
     
//     const getInventoryTypeName = (selectedInventoryTypeId: number) => {
//         const inventory = inventoryTypes.find(type => type.inventoryTypeId === selectedInventoryTypeId);
//         return inventory ? inventory.inventoryTypeName : '';
//     };

  
//     return (
//         <div className="popup-requestForm">
//              <div style={{zIndex:1000}}>
              
//              </div>
//             <div className="popup-inner-requestForm">
//                 <div className='InventorySelect-requestForm'>
//                     <InventoryTypeSelect
//                         inventoryTypes={inventoryTypes}
//                         selectedInventoryTypeId={selectedInventoryTypeId}
//                         handleInventoryTypeChange={handleInventoryTypeChange}
                        
//                     />
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <h3 className='heading-requestForm'>Inventory Request</h3>

//                     <div className='Inventoryname-requestForm'>
//                         <InputField
//                             placeholder="Enter Inventory Name"
//                             value={values.inventory}
//                             width='550px'
//                             onChange={handleChangeInventoryName}
//                         />
//                                 <div className='Inventoryname-requestForm-Error'
//                                 >
//                                 <label>{inventoryNameError}</label>
//                         </div>

//                     </div>

//                     <div className='InventoryType-fill-requestForm'>
//                         <DisplayValue
//                             placeholder="Selected Type"
//                             width="450px"
//                             value={inventoryTypeName}
                            
//                         />
//                     </div>
//                     <div className='InventoryType-requestForm-Error' 
//                      >
//                         {inventoryTypeErr}
//                     </div>
                    
//                     <div className='massage-requestForm'>
//                         <textarea
//                             id="message"
//                             name="message"
//                             value={values.message}
//                             onChange={handleChangeMessage}
                            
//                             rows={5}
//                             cols={40}
//                             placeholder="Enter your message here"
//                         />
//                     </div>
//                     <div className='massage-requestForm-Error'
//                      >
//                       {messageError}
//                     </div>
                   

//                     <div className="submitButton-requestForm">
//                         <AdvancedButton type="submit" disabled={disabledSubmitButton}>Submit</AdvancedButton>
//                     </div>

//                     <div className="closeButton-requestForm">
//                         <AdvancedButton onClick={handleClose} type="button">Cancel</AdvancedButton>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RequestForm;
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import InputField from './InputField';
import DisplayValue from './DisplayValue';
import AdvancedButton from './AdvancedButton';
import InventoryTypeSelect from './InventoryTypeFilter';
import '../../styles/inventory/RequestForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Request {
    requestId: number;
    employeeId: number;
    inventoryTypeId: number;
    message: string;
    inventory: string;
    isRead: boolean;
    deleted: boolean;
    rejected: boolean;
    reason: string | null;
    createdDate: string;
    inventoryType: {
        inventoryTypeName: string;
    };
}

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}

const RequestForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const [values, setValues] = useState<Request>({
        requestId: 0,
        employeeId: 0,
        inventoryTypeId: 0,
        message: '',
        inventory: '',
        isRead: false,
        deleted: false,
        rejected: false,
        reason: '',
        createdDate: '',
        inventoryType: {
            inventoryTypeName: ''
        }
    });

    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(0);
    const [messageError, setMessageError] = useState<string>('');
    const [inventoryNameError, setInventoryNameError] = useState<string>('');
    const [inventoryTypeName, setInventoryTypeName] = useState<string>('');
    const [inventoryTypeErr, setInventoryTypeError] = useState<string>('');
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(true);

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

    const messageValidate = (message: string): string => {
        if (message.trim().length > 150) {
            return "Message must be less than 150 characters";
        } else {
            return "";
        }
    };

    const InventoryNameValidate = (inventory: string): string => {
        if (!inventory.trim()) {
            return "* This field cannot be empty";
        } else if (inventory.trim().length > 30) {
            return "* Inventory Name must be less than 30 characters";
        } else {
            return "";
        }
    };

    const handleChangeInventoryName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = { ...values, inventory: event.target.value };
        setValues(value);
        const validateError = InventoryNameValidate(value.inventory);
        setInventoryNameError(validateError);
        setDisabledSubmitButton(!!validateError || !!messageError || !!inventoryTypeErr);
    };

    const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = { ...values, message: event.target.value };
        setValues(value);
        const validateError = messageValidate(value.message);
        setMessageError(validateError);
        setDisabledSubmitButton(!!validateError || !!inventoryNameError || !!inventoryTypeErr);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameError = InventoryNameValidate(values.inventory);
        const msgError = messageValidate(values.message);
        const inventoryTypeError = inventoryTypeName ? "" : "* Inventory type field cannot be empty";

        setInventoryNameError(nameError);
        setInventoryTypeError(inventoryTypeError);
        setMessageError(msgError);

        if (nameError || msgError || inventoryTypeError) {
            setDisabledSubmitButton(true);
            return;
        }

        try {
            const requestPayload = {
                employeeId: 8,
                inventoryTypeId: selectedInventoryTypeId,
                message: values.message,
                inventory: values.inventory,
                isRead: values.isRead,
                deleted: values.deleted,
                rejected: values.rejected,
                reason: ''
            };

            const res = await axios.post("https://localhost:7166/api/request/add", requestPayload);
            console.log(res);
            handleClose();

            // Reset form values
            setValues({
                requestId: 0,
                employeeId: 0,
                inventoryTypeId: 0,
                message: '',
                inventory: '',
                isRead: false,
                deleted: false,
                rejected: false,
                reason: '',
                createdDate: '',
                inventoryType: {
                    inventoryTypeName: ''
                }
            });

            toast.success('Request posted successfully');
            setSelectedInventoryTypeId(0);
            setInventoryTypeName('');
        } catch (err) {
            console.log(err);
            toast.error('Failed to post request');
        }
    };

    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
        const selectedTypeName = getInventoryTypeName(selectedInventoryTypeId);
        setInventoryTypeName(selectedTypeName);
        setInventoryTypeError(selectedTypeName ? '' : "* Inventory type field cannot be empty");
        setDisabledSubmitButton(!selectedTypeName || !!inventoryNameError || !!messageError);
    };

    const getInventoryTypeName = (selectedInventoryTypeId: number) => {
        const inventory = inventoryTypes.find(type => type.inventoryTypeId === selectedInventoryTypeId);
        return inventory ? inventory.inventoryTypeName : '';
    };

    return (
        <div className="popup-requestForm">
            <div style={{ zIndex: 1000 }}>
                <ToastContainer />
            </div>
            <div className="popup-inner-requestForm">
                <div className='InventorySelect-requestForm'>
                    <InventoryTypeSelect
                        inventoryTypes={inventoryTypes}
                        selectedInventoryTypeId={selectedInventoryTypeId}
                        handleInventoryTypeChange={handleInventoryTypeChange}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <h3 className='heading-requestForm'>Inventory Request</h3>

                    <div className='Inventoryname-requestForm'>
                        <InputField
                            placeholder="Enter Inventory Name"
                            value={values.inventory}
                            width='550px'
                            onChange={handleChangeInventoryName}
                        />
                        <div className='Inventoryname-requestForm-Error'>
                            <label>{inventoryNameError}</label>
                        </div>
                    </div>

                    <div className='InventoryType-fill-requestForm'>
                        <DisplayValue
                            placeholder="Selected Type"
                            width="450px"
                            value={inventoryTypeName}
                        />
                    </div>
                    <div className='InventoryType-requestForm-Error'>
                        {inventoryTypeErr}
                    </div>

                    <div className='massage-requestForm'>
                        <textarea
                            id="message"
                            name="message"
                            value={values.message}
                            onChange={handleChangeMessage}
                            rows={5}
                            cols={40}
                            placeholder="Enter your message here"
                        />
                    </div>
                    <div className='massage-requestForm-Error'>
                        {messageError}
                    </div>

                    <div className="submitButton-requestForm">
                        <AdvancedButton type="submit" disabled={disabledSubmitButton}>Submit</AdvancedButton>
                    </div>

                    <div className="closeButton-requestForm">
                        <AdvancedButton onClick={handleClose} type="button">Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;

