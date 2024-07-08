import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../styles/inventory/Popup.css'; 
import axios from 'axios';
import EmployeeSelect from './EmployeeFilter';
import InventoryTypeSelect from './InventoryTypeFilter';
import InputField from './InputField';
import DisplayValue from './DisplayValue';
import AdvancedButton from './AdvancedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Inventory2 {
    InventoryTypeId: number;
    InventoryName: string;
    employeeId: number;
    CreatedBy: number;
    Deleted: boolean;
    file: File | null;
    image: File | null;
    DeletedBy: number;
}

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}

interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
}

const CardComponent: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const [values, setValues] = useState<Inventory2>({
        InventoryTypeId: 0,
        InventoryName: '',
        employeeId: 0,
        CreatedBy: 2,
        Deleted: false,
        file: null,
        image: null,
        DeletedBy: 2 // to store the selected image file
    });

    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(0);
    const [imageError, setImageError] = useState<string>('');
    const [fileError, setFileError] = useState<string>('');
    const [InventoryTypeValidationError, setInventoryTypeValidationError] = useState<string>('');
    const [InventoryNameValidationError, setInventoryNameValidationError] = useState<string>('');

    useEffect(() => {
        fetchInventoryTypes();
        fetchEmployees();
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

    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/employee/Employee');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data: Employee[] = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isValidFileType(file, 'file') || file.size > MAX_FILE_SIZE) {
            handleFileValidationError("* Invalid file or file size exceeds limit");
        } else {
            setValues({ ...values, file: file });
            handleFileValidationError(""); // Clear any previous errors
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0];
        if (!img || !isValidFileType(img, 'image') || img.size > MAX_FILE_SIZE) {
            handleImageValidationError("* Invalid image file or size exceeds limit");
        } else {
            setValues({ ...values, image: img });
            handleImageValidationError(""); // To Clear any previous errors
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
            formData.append('file', values.file as File);
            formData.append('image', values.image as File);

            const otherData = {
                InventoryTypeId: selectedInventoryTypeId,
                InventoryName: values.InventoryName,
                employeeId: selectedEmployeeId,
                CreatedBy: 2,
                Deleted: values.Deleted,
            };

            formData.append('otherData', JSON.stringify(otherData));

            const res = await axios.post("https://localhost:7166/api/inventory/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res);
            handleClose();
            toast.success('Inventory updated successfully');

            // Reset form values
            setValues({
                InventoryTypeId: 0,
                InventoryName: '',
                employeeId: 0,
                CreatedBy: 2,
                Deleted: false,
                file: null,
                image: null,
                DeletedBy: 2
            });
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

    // Setting the employee selected from dropdown menu
    const handleEmployeeChange = (selectedEmployeeId: number) => {
        setSelectedEmployeeId(selectedEmployeeId);
    };

    // Setting the inventory type selected from dropdown menu
    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
    };

    const getInventoryTypeName = (selectedInventoryTypeId: number) => {
        const inventory = inventoryTypes.find(type => type.inventoryTypeId === selectedInventoryTypeId);
        return inventory ? inventory.inventoryTypeName : '';
    };

    const getEmployeeName = (selectedEmployeeId: number) => {
        const employee = employees.find(employee => employee.employeeID === selectedEmployeeId);
        return employee ? `${employee.firstName} ${employee.lastName}` : '';
    };

    return (
        <div className="popup-inventorypost">
            <div className="popup-inner-inventorypost">
              
                <div className='InventorySelect-inventorypost'>
                    <InventoryTypeSelect
                        inventoryTypes={inventoryTypes}
                        selectedInventoryTypeId={selectedInventoryTypeId}
                        handleInventoryTypeChange={handleInventoryTypeChange}
                       
                    />
                </div>

                <div className='employeeSelect-inventorypost' >
                    <EmployeeSelect
                        employees={employees}
                        selectedEmployeeId={selectedEmployeeId}
                        handleEmployeeChange={handleEmployeeChange}
                       
                    />
                </div>

                <form onSubmit={handleSubmit}>

                    <div className='Add-Inventory-heading'>
                        <h3 >Add Inventory</h3>
                    </div>



                            <div className ='Inventoryname-inventorypost'>
                                <InputField
                                    placeholder ="Enter Inventory Name"
                                    value={values.InventoryName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setValues({ ...values, InventoryName: e.target.value })}
                                />
                            </div>
                            <div className ='InventoryNameError-inventorypost'>
                               {InventoryNameValidationError}
                            </div>
                   


                   
                        <div className = 'InventoryType-fill-inventorypost'>
                            <DisplayValue
                                placeholder = "Selected Type"
                                value={getInventoryTypeName(selectedInventoryTypeId)}
                            />
                        </div>
                        <div className='InventoryTypeError-inventorypost'>
                            {InventoryTypeValidationError}
                        </div>
                    

                    <div className='Employee-fill-inventorypost'>
                        <DisplayValue
                            placeholder="Assigned To"
                            
                            
                            value={getEmployeeName(selectedEmployeeId)}
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
                            style={{ display: "none", border: "2px solid #00A7A7",height:"100px",width:"100px"}}
                        />
                      
                       
                        <input
                            type='text'
                            readOnly
                            value={values.file ? values.file.name : "No Files selected"}
                            className="custom-file-upload2"
                            style={{ border: "2px solid #00A7A7",borderRadius:"5px" }}
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
                            style={{display: "none", border: "2px solid #00A7A7",backgroundColor:"gray",color:"white"}}
                        />
                        <input
                            type='text'
                            readOnly
                            value={values.image ? values.image.name : "No images selected"}
                            className="custom-file-upload2"
                            style={{ border: "2px solid #00A7A7",borderRadius:"5px"}}
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
