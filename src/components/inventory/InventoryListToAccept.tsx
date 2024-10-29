import React, { useState, useEffect } from 'react';
import '../../styles/inventory/PopupType.css';
import AdvancedButton from './AdvancedButton';


interface Props {
    handleClose: () => void;
    EmployeeId:number;
    InventoryTypeId:number;
}
interface Inventory {
    inventoryId: number;
    employeeId: number | null;
    inventoryTypeId: number;
    inventoryName: string;
    inventoryType: {
      inventoryType: string;
    };
    employee: {
      firstName: string;
      lastName: string;
    } | null;
    fileUrl: string;
    imageUrl: string;
    assignedDate: string;
  }

const CardComponent_Type: React.FC<Props> = ({ handleClose, EmployeeId}) => {
 
    const [inventories, setInventories] = useState<Inventory[]>([]);

    useEffect(() => {
       fetchInventories();
    }, []);

    const fetchInventories = async () => {
        try {
            let url = `https://localhost:7166/api/inventory/filter/type`;
           
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch inventories');
            }
            const data: Inventory[] = await response.json();
            setInventories(data);
        } catch (error) {
            console.error('Error fetching inventories:', error);
        }
    };


    return (

        <div className="popup-type">
        <div className="popup-inner-type">
        <h3 className='Add-InventoryType-heading'>Edit Inventory</h3>
        <div>
                   
                   {inventories.filter(inventory => inventory.employeeId != 0)
                    
                    .map(inventory => (
                       <li key={inventory.inventoryId} value={inventory.inventoryId}>
                           {inventory.inventoryName} 
                           <input type="radio" name="inventory" value={inventory.inventoryId} />
                       </li>
                   ))}
</div>
               
            
                         
                   
                  
                
                
               
                
                <div className="button-close-type">
                    <AdvancedButton type="button" onClick={handleClose}>Cancel</AdvancedButton>
                </div>
        
        </div>
        </div>
       
    );
}
export default CardComponent_Type;

