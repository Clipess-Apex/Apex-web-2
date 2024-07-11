import React, { useState, useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownIcon from './DropdownIcon';
import ImageWithPDFViewer from './ImageWithPdfViewer';
import ImagePopup from './ImagePopup';
import '../../styles/inventory/Popup.css';
import '../../styles/inventory/EmployeeExpandCard.css';
import DisplayDetailsField from './DisplayDetailsField';


interface Inventory {
  inventoryId: number;
  employeeId: number | null;
  inventoryTypeId: number;
  inventoryName: string;
  inventoryType: {
    inventoryTypeName: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  } | null;
  fileUrl: string;
  imageUrl: string;
  assignedDate: string;
}

interface Props {
  inventories: Inventory[];
}

const EmployeeInventories: React.FC<Props> = ({ inventories }) => {
  const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
  const [selectedInventoryDetails, setSelectedInventoryDetails] = useState<Inventory | null>(null);

  const [expandedInventoryId, setExpandedInventoryId] = useState<number | null>(null);

  const [showPopup3, setShowPopup3] = useState<boolean>(false);

  const fetchInventoryDetails = async () => {
    try {
      const url3 = `https://localhost:7166/api/inventory/inventory/${selectedInventoryId}`;
      const response = await fetch(url3);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory details');
      }
      const data: Inventory = await response.json();
      setSelectedInventoryDetails(data);
    } catch (error) {
      console.error('Error fetching inventory details:', error);
    }
  };

  useEffect(() => {
    if (selectedInventoryId) {
      fetchInventoryDetails();
    }
  }, [selectedInventoryId]);

  const toggleExpansion = (inventoryId: number) => {
    setExpandedInventoryId(inventoryId === expandedInventoryId ? null : inventoryId);
  };

  const handleCardClick = (inventoryId: number) => {
    toggleExpansion(inventoryId);
    setSelectedInventoryId(inventoryId);
  };

  const handleClosePopup3 = () => {
    setShowPopup3(false);
  };

  const handleImageView = () => {
    setShowPopup3(true);
  };

  return (
    <div className="inventory-card-container">
      <ToastContainer />
      {inventories.map((inventory) => (
        <div key={inventory.inventoryId}>
          <div
            key={inventory.inventoryId}
            className={`initial-card-inventory ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}
            onClick={() => handleCardClick(inventory.inventoryId)}
          >
            <div>
              <ul>
                <li className="inventorylist_init">
                  <div className={`dropdownicon ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}>
                    <DropdownIcon size="30px" color="#00A7A7" />
                  </div>
                  <div className='inventorylist_init-name'>
                    {inventory.inventoryName}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className={`inventory-card-inventory ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}>
            {expandedInventoryId === inventory.inventoryId && selectedInventoryDetails &&
              selectedInventoryDetails.inventoryId === inventory.inventoryId && (
                <div className="details">
                  <div className='InventoryName-ex'>
                    <DisplayDetailsField
                      displayplaceholder="Inventory Name"
                      displayvalue={selectedInventoryDetails.inventoryName}
                    />
                  </div>
                  <div className='InventoryType-ex'>
                    <DisplayDetailsField
                      displayplaceholder="Inventory Type"
                      displayvalue={selectedInventoryDetails.inventoryType.inventoryTypeName}
                    />
                  </div>
                   <div className='AssignedDate'>
                    <DisplayDetailsField
                      displayplaceholder="Assigned Date"
                      displayvalue={selectedInventoryDetails.assignedDate.substring(0, 10)}
                    />
                  </div> 
                  
                  <div className='InventoryFile-ex'>
                    <ImageWithPDFViewer
                      imageUrl2={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"}
                      pdfUrl={selectedInventoryDetails.fileUrl} />
                  </div>
                  <div className='InventoryImage-ex'>
                    <img src={selectedInventoryDetails.imageUrl} alt="Thumbnail" onClick={handleImageView} style={{ height: "100px", width: "100px" }} />
                    {showPopup3 && (<ImagePopup handleClose={handleClosePopup3} imageUrl={selectedInventoryDetails.imageUrl} />)}
                  </div>
                 
                </div>
              )}
          </div>
        </div>
      ))}
     </div>
  );
};

export default EmployeeInventories;
