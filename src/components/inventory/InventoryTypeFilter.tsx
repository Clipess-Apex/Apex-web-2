import React, { useState } from 'react';
import '../../styles/inventory/DropdownMenu.css';
import DropdownIcon2 from './Dropdown2';


interface InventoryType{
        inventoryTypeId: number;
        inventoryTypeName: string;
    }

interface Props {
        inventoryTypes: InventoryType[];
        selectedInventoryTypeId: number; 
        handleInventoryTypeChange: (inventoryTypeId: number) => void; 
        AllOrNone?:string;
    }

    const InventoryTypeSelect: React.FC<Props> = ({ inventoryTypes, selectedInventoryTypeId, handleInventoryTypeChange, AllOrNone})=> {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInventoryType, setselectedInventoryType] = useState('');
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (inventoryTypeId:number,selectedInventoryType:string) => {
      selectedInventoryTypeId = inventoryTypeId;
     
      setselectedInventoryType(selectedInventoryType);
      handleInventoryTypeChange(inventoryTypeId);
      setIsOpen(false); 
    };

   const handleShowAll = () => {
      handleSelect(0,'All Types'); 
    };

    return (
      <div className="employee-select">
        <div className='dropdown-container'>
          <div className="dropdown-toggle">
            <label> { selectedInventoryType || "All Types"}</label>
            <button type="button" onClick={toggleDropdown}>
              <DropdownIcon2 size="30px" color="#00A7A7"/>
            </button>
          </div>
          {isOpen && (
            <ul id="inventoryType" className='dropdown-menu'>
              {inventoryTypes.length > 3 ? ( // Check if inventoryTypes length is greater than 10
                <div className="scrollable-menu">
                  <button  onClick={handleShowAll} className='dropdown-item'>{AllOrNone}</button>
                 
                  {inventoryTypes.map(type => (
                    <button key={type.inventoryTypeId} value={type.inventoryTypeId} className='dropdown-item' onClick={() => handleSelect(type.inventoryTypeId, type.inventoryTypeName)}>
                      {type.inventoryTypeName}
                    </button>
                  ))}
                </div>
              ) : (
                inventoryTypes.map(type => (
                  <li key={type.inventoryTypeId} value={type.inventoryTypeId} className='dropdown-item' onClick={() => handleSelect(type.inventoryTypeId,type.inventoryTypeName)}>
                    {type.inventoryTypeName}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
  
  export default InventoryTypeSelect;
  