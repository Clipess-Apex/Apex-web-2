import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../styles/inventory/Popup.css'; 
import axios from 'axios';
import InputField from './InputField';
import DisplayValue from './DisplayValue';
import AdvancedButton from './AdvancedButton';
import EmployeeSelect from './EmployeeFilter';
import InventoryTypeSelect from './InventoryTypeFilter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}
interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
}
interface Props {
   
    inventoryName: string;
    InventoryTypeId: number;
    inventoryType: string;
    firstName: string;
    lastName: string;
    fileUrl: string;
    imageUrl: string;
    onAdd: () => void; 
    selectedEditId: number;
    handleClose: () => void;
}


const CardComponent: React.FC<Props> = ({
    inventoryName,
    InventoryTypeId,
    inventoryType,
    firstName,
    lastName,
    fileUrl,
    imageUrl,
    onAdd,
    selectedEditId,
    handleClose,
    
}) => {
    const [values, setValues] = useState({
        inventoryType: inventoryType,
        
        InventoryName: inventoryName,
        InventoryTypeId: InventoryTypeId,
        firstName: firstName,
        lastName: lastName,
        CreatedBy: 2,
        Deleted: false,
        file: null as File | null,
        image: null as File | null,
        selectedImage: imageUrl ? imageUrl.split('/').pop() : null,
        selectedFile: fileUrl ? fileUrl.split('/').pop() : null
    });

    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(InventoryTypeId);
    const [imageError, setImageError] = useState<string>('');
    const [fileError, setFileError] = useState<string>('');
    const [InventoryTypeValidationError, setInventoryTypeValidationError] = useState<string>('');
    const [InventoryNameValidationError, setInventoryNameValidationError] = useState<string>('');
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchInventoryTypes();
        fetchEmployees();
        
        
    }, []);
   

   
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isValidFileType(file, 'file') || file.size > MAX_FILE_SIZE) {
            handleFileValidationError("Invalid file or file size exceeds limit");
        } else {
            setValues({ ...values, file: file });
            handleFileValidationError(""); // Clear any previous errors
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0];
        if (!img || !isValidFileType(img, 'image') || img.size > MAX_FILE_SIZE) {
            handleImageValidationError("Invalid image file or size exceeds limit");
        } else {
            setValues({ ...values, image: img });
            handleImageValidationError(""); // To Clear any previous errors
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

    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/employee/Employee');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!values.InventoryName.trim()) {
                setInventoryNameValidationError("* Inventory name cannot be empty");
                return; // To Prevent further execution if inventory name is empty
            } else if (values.InventoryName.trim().length > 60) {
                setInventoryNameValidationError("* Inventory name must be less than 60 characters");
                return; // To Prevent further execution if inventory name exceeds 60 characters
            } else {
                setInventoryNameValidationError("");
            }

            if (!selectedInventoryTypeId) {
                setInventoryTypeValidationError("* Inventory type cannot be empty");
                return; // To Prevent further execution if inventory type is empty
            } else {
                setInventoryTypeValidationError("");
            }

            const formData = new FormData();
            if (values.file) formData.append('file', values.file);
            if (values.image) formData.append('image', values.image);

            const otherData = {
                InventoryTypeId: selectedInventoryTypeId,
                InventoryName: values.InventoryName,
                employeeId: selectedEmployeeId,
                CreatedBy: 2,
                Deleted: values.Deleted
            };

            formData.append('otherData', JSON.stringify(otherData));

            const res = await axios.put(`https://localhost:7166/api/inventory/update/${selectedEditId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            handleClose();
            onAdd();
            toast.success('Inventory updated successfully');

        } catch (err) {
            console.log(err);
            toast.error('Error updating inventory');
        }
    };

    const MAX_FILE_SIZE = 1024000; // 1Mb
    const validImageExtensions = ['jpg', 'png'];
    const validFileExtension = 'pdf';

    const isValidFileType = (file: File, type: 'image' | 'file') => {
        const allowedExtensions = type === 'image' ? validImageExtensions : [validFileExtension];
        return allowedExtensions.includes(file.name.split('.').pop()?.toLowerCase() || '');
    };

    const handleImageValidationError = (error: string) => {
        setImageError(error);
    };

    const handleFileValidationError = (error: string) => {
        setFileError(error);
    };

    const handleEmployeeChange = (selectedEmployeeId: number) => {
        setSelectedEmployeeId(selectedEmployeeId);
        const employee = employees.find(employee => employee.employeeID === selectedEmployeeId);
        if (employee) {
            setValues(prevState => ({
                ...prevState,
                firstName: employee.firstName,
                lastName: employee.lastName
            }));
        }
    };

    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
        const inventoryType = inventoryTypes.find(type => type.inventoryTypeId === selectedInventoryTypeId);
        if (inventoryType) {
            setValues(prevState => ({
                ...prevState,
                inventoryType: inventoryType.inventoryTypeName,
            }));
        }
    };

    return (
        <div className="popup-inventorypost">
            <div className="popup-inner-inventorypost">
                <div className='InventorySelect-inventorypost'>
                    <InventoryTypeSelect
                        inventoryTypes={inventoryTypes}
                        selectedInventoryTypeId={selectedInventoryTypeId} // Pass down the state
                        handleInventoryTypeChange={handleInventoryTypeChange}
                        AllOrNone="None"
                    />
                </div>
                <div className='employeeSelect-inventorypost'>
                    <EmployeeSelect
                        employees={employees}
                        selectedEmployeeId={selectedEmployeeId}
                        handleEmployeeChange={handleEmployeeChange}
                        AllOrNone="None"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                        <div className='Add-Inventory-heading'>
                            <h3 >Update Inventory</h3>
                        </div>
                   

                    <div className='Inventoryname-inventorypost'>
                        <InputField
                            placeholder="Enter Inventory Name"
                            value={values.InventoryName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({ ...values, InventoryName: e.target.value })}
                        />
                    </div>
                    <div className ='InventoryNameError-inventorypost'>
                           {InventoryNameValidationError}
                        </div>
        

                    <div className='InventoryType-fill-inventorypost'>
                        <DisplayValue
                            placeholder="Selected Inventory Type"
                            value={values.inventoryType} // Use state for updates
                            onChange={handleChange}
                        />
                    </div>
                    <div className='InventoryTypeError-inventorypost'>
                        {InventoryTypeValidationError}
                    </div>
                    <div className='Employee-fill-inventorypost'>
                        <DisplayValue
                            placeholder="Assigned To"
                            value={values.firstName + " " + values.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='FileInput-inventorypost'>
                    <div className='file-input-button-inventorypost'>
                        <label htmlFor="fileInput" className="custom-file-upload" style={{paddingBottom:"15px",position:"relative",left:"20px"}}>
                            Choose file
                        </label> 
                    </div>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: "none", border: "2px solid #00A7A7" }}
                        />
                        <input
                            type='text'
                            readOnly
                            value={values.file ? values.file.name : "No Files selected"}
                            className="custom-file-upload2"
                            style={{ border: "2px solid #00A7A7" }}
                        />
                    </div>
                    <div className='file-input-error'>
                        {fileError && <div>{fileError}</div>}
                </div>
             

                    <div className='imageInput-inventorypost'>
                    <div className='image-input-button-inventorypost'>
                        <label htmlFor="imageFile" className="custom-file-upload" style={{paddingRight:"20px",paddingBottom:"40px",position:"relative",left:"20px"}}>
                            Choose image
                        </label>
                    </div>
                        <input
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            onChange={handleImageChange}
                            style={{ display: "none", border: "2px solid #00A7A7" }}
                        />
                        <input
                            type='text'
                            readOnly
                            value={values.image ? values.image.name : "No images selected"}
                            className="custom-file-upload2"
                            style={{ border: "2px solid #00A7A7" }}
                        />
                    </div>
                    <div style={{height:'15px'}} className='image-input-error'>
                        {imageError && <div>{imageError}</div>}
                        </div>

                    <div className="button-submit-inventorypost">
                        <AdvancedButton type="submit">Submit</AdvancedButton>
                    </div>

                    <div className="button-close-inventorypost">
                        <AdvancedButton onClick={handleClose} type="button">Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CardComponent;
