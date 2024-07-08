import React, { useState } from 'react';
import '../../styles/inventory/DropdownMenu.css';
import DropdownIcon2 from './Dropdown2'

interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
}

interface Props {
    employees: Employee[];
    selectedEmployeeId: number;
    handleEmployeeChange: (employeeId: number) => void;
    AllOrNone?:string;
}

const EmployeeSelect: React.FC<Props> = ({ employees, selectedEmployeeId, handleEmployeeChange,AllOrNone }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (employeeId:number,selectedEmployeefirstName:string,selectedEmployeelastName:string) => {
        selectedEmployeeId = employeeId;
        setSelectedEmployee(selectedEmployeefirstName+ " " + selectedEmployeelastName);
        handleEmployeeChange(employeeId);
        setIsOpen(false); // Close the dropdown after selection
    };

    const showAll = () => {
        handleSelect(0,'All employees','');
    }

    return (
        <div className="employee-select">
            <div className="dropdown-container">
                <div className="dropdown-toggle">
                    <label> { selectedEmployee || "All employees"} </label>
                    <button  onClick={toggleDropdown}>
                        <DropdownIcon2 size="30px" color="#00A7A7"/> 
                    </button>
                </div>
                {isOpen && (
                    <ul id="employee" className='dropdown-menu'>
                        {employees.length > 3 ? ( // Check if employees length is greater than 3
                            <div className="scrollable-menu">
                                <button className='dropdown-item' onClick={showAll}>{AllOrNone}</button>
                                {employees.map(employee => (
                                    <button key={employee.employeeID} value={employee.employeeID} className='dropdown-item' onClick={() => handleSelect(employee.employeeID,employee.firstName,employee.lastName)}>
                                        {employee.firstName} {employee.lastName}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            employees.map(employee => (
                                <li key={employee.employeeID} value={employee.employeeID} className='dropdown-item' onClick={() => handleSelect(employee.employeeID,employee.firstName,employee.lastName)}>
                                    {employee.firstName} {employee.lastName}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default EmployeeSelect;