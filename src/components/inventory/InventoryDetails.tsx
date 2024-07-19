import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import DropdownIcon from './DropdownIcon';
import ImageWithPDFViewer from './ImageWithPdfViewer';
import CardComponent from './EditInventory';
import ImagePopup from './ImagePopup';
import axios from 'axios';
import '../../styles/inventory/Popup.css';
import '../../styles/inventory/ExpandCard.css';
import DisplayDetailsField from './DisplayDetailsField';
import ShowAlert from './ShowAlert';

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

const InventoryCard2: React.FC<Props> = ({ inventories }) => {
  const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
  const [selectedInventoryDetails, setSelectedInventoryDetails] = useState<Inventory | null>(null);
  const [selectedEditId, setSelectedEditId] = useState<number | null>(null);
  const [expandedInventoryId, setExpandedInventoryId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopup2, setShowPopup2] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showPopup3, setShowPopup3] = useState<boolean>(false);

  useEffect(() => {
  
    if (selectedInventoryId) {
            fetchInventoryDetails();
       }
  
}, [selectedInventoryId]);

// useEffect(() => {
//  if(selectedInventoryDetails){
//     fetchInventoryDetails();
//  }

// }, [selectedInventoryDetails?.inventoryName,selectedInventoryDetails?.inventoryType,selectedInventoryDetails?.employee,selectedInventoryDetails?.fileUrl,selectedInventoryDetails?.imageUrl]);

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

  

 

  const handleDelete = async () => {
    try {
      if (deleteId) {
        const formData = new FormData();
        const otherData = {
          deleted: true,
          deletedBy: 3
        };
        formData.append('otherData', JSON.stringify(otherData));
        const res = await axios.put(`https://localhost:7166/api/inventory/delete/${deleteId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(res);
        if (res.status === 200) {
          toast.success('Inventory deleted successfully');
          setDeleteId(null); // Clear the deleteId to close the popup
          setShowPopup2(false);// Close the popup after deletion
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Error updating inventory');
    }
  };

  const toggleExpansion = (inventoryId: number) => {
    setExpandedInventoryId(inventoryId === expandedInventoryId ? null : inventoryId);
  };

  const handleCardClick = (inventoryId: number) => {
    toggleExpansion(inventoryId);
    setSelectedInventoryId(inventoryId);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  const handleClosePopup3 = () => {
    setShowPopup3(false);
  };

  const handleEditClick = (editId: number) => {
    setSelectedEditId(editId);
    setSelectedInventoryDetails(selectedInventoryDetails);
    setShowPopup(true);
  };

  const handleDeleteClick = (deleteId: number) => {
    setDeleteId(deleteId);
    setShowPopup2(true);
  };

  const handleConfirm = () => {
    handleDelete(); // Actually perform the deletion
  };

  const handleImageView = () => {
    setShowPopup3(true);
  };

  const handleAddInventory = () => {
    fetchInventoryDetails(); // Refetch inventories after adding a new one
};

  return (
    <div className="inventory-card-container-InventoryDetails">
      <ToastContainer />
      {inventories.map((inventory) => (
        <div key={inventory.inventoryId}>
          <div
            key={inventory.inventoryId}
            className={`initial-card-InventoryDetails ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}
            onClick={() => handleCardClick(inventory.inventoryId)}
          >
            <div>
              <ul>
                <li className="inventorylist_init-InventoryDetails">
                  <div className={`dropdownicon-InventoryDetails ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}>
                    <DropdownIcon size="30px" color="#00A7A7"/>
                  </div>
                  <div className='inventorylist_init-name-InventoryDetails'>
                    {inventory.inventoryName}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className={`inventory-card-InventoryDetails ${expandedInventoryId === inventory.inventoryId ? 'expanded' : ''}`}>
            {expandedInventoryId === inventory.inventoryId && selectedInventoryDetails &&
              selectedInventoryDetails.inventoryId === inventory.inventoryId && (
                <div className="details-InventoryDetails" >
                  <div className='InventoryName-ex-InventoryDetails'>
                    <DisplayDetailsField
                      displayplaceholder="Inventory Name"
                      displayvalue={selectedInventoryDetails.inventoryName}
                      width='450px'
                    />
                  </div>
                  <div className='InventoryType-ex-InventoryDetails'>
                    <DisplayDetailsField
                      displayplaceholder="Inventory Type"
                      displayvalue={selectedInventoryDetails.inventoryType.inventoryTypeName}
                      width='300px'
                    />
                  </div>
                  <div className='AssignedEmployee-InventoryDetails'>
                    <DisplayDetailsField
                      displayplaceholder="Assigned To"
                      displayvalue={selectedInventoryDetails.employee ? `${selectedInventoryDetails.employee.firstName} ${selectedInventoryDetails.employee.lastName}` : "Unassigned"}
                      width='450px'
                    />
                  </div> 
                  <div className='AssignedDate-InventoryDetails'>
                    <DisplayDetailsField
                      displayplaceholder="Assigned Date"
                      displayvalue={selectedInventoryDetails.assignedDate?`${selectedInventoryDetails.assignedDate.substring(0, 10)}`:"yyyy-mm-dd"}
                      width='300px'
                    />
                  </div> 

                 <div className='InventoryFile-ex-InventoryDetails'>
                  {selectedInventoryDetails.fileUrl ? (
                        <div >
                        <ImageWithPDFViewer
                          imageUrl2={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"}
                          pdfUrl={selectedInventoryDetails.fileUrl} />
                      </div>
                    ) : (
                        <div className='no-files-message-inventorydetails'>
                           No files
                        </div>
                    )}

                  </div>
                  <div className='InventoryImage-ex-InventoryDetails'>
                    {selectedInventoryDetails.imageUrl ? (
                         <div >
                         <img src={selectedInventoryDetails.imageUrl} alt="Thumbnail" onClick={handleImageView} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
                         {showPopup3 && (<ImagePopup handleClose={handleClosePopup3} imageUrl={selectedInventoryDetails.imageUrl} />)}
                       </div>
                    ) : (
                        <div className='no-files-message-inventorydetails'>
                           <img src={'https://isjade.simplify.cool/images/no-image-2.jpg'} height='100px' width='100px'></img>
                        </div>
                    )}
                    </div>
                    <div className="button_arrange-InventoryDetails" >
                    <button style={{ width: "30px", backgroundColor: "white", border: "white" }} onClick={() => handleDeleteClick(inventory.inventoryId)}><DeleteIcon size="30px" color="red" /></button>
                    <button style={{ width: "30px", backgroundColor: "white", border: "white" }} onClick={() => handleEditClick(inventory.inventoryId)}><EditIcon size="30px" color="black" /></button>
                  </div>
                </div>
              )}
          </div>
        </div>
      ))}
      <div>
        {selectedInventoryDetails && selectedEditId && showPopup && (
          <CardComponent
            inventoryName={selectedInventoryDetails.inventoryName}
            inventoryType={selectedInventoryDetails.inventoryType.inventoryTypeName}
            firstName={selectedInventoryDetails.employee ? selectedInventoryDetails.employee.firstName : ""}
            lastName={selectedInventoryDetails.employee ? selectedInventoryDetails.employee.lastName : ""}
            fileUrl={selectedInventoryDetails.fileUrl}
            InventoryTypeId={selectedInventoryDetails.inventoryTypeId}
            imageUrl={selectedInventoryDetails.imageUrl}
            selectedEditId={selectedEditId}
            onAdd={handleAddInventory}
            handleClose={handleClosePopup} />
        )}
      </div>

      {deleteId && showPopup2 && selectedInventoryDetails && (
        <ShowAlert
          deletedInventory={selectedInventoryDetails.inventoryName}
          handleClose={handleClosePopup2}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default InventoryCard2;
