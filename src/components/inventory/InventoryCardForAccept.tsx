import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ImagePopup from './ImagePopup';
import '../../styles/inventory/InventoryCardForAccept.css';
import DropdownIcon from './DropdownIcon'
import ShowAlertForAccept from './ShowAlertForAccept'
import RejectReason from './RejectReason'
interface Props {
  inventories: Inventory[];
  requestdetails: Request;
}

interface Request {
  requestId: number;
  employeeId: number;
  inventoryTypeId: number;
  inventoryId:number;
  message: string;
  inventory: string;
  isRead: boolean;
  deleted: boolean;
  rejected: boolean;
  reason: string;
  createdDate: string;
  inventoryType: {
    inventoryTypeName: string;
  };
}

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

const CardForAccept: React.FC<Props> = ({ inventories, requestdetails }) => {
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<number>(0);
  const [showPopupAccept, setshowPopupAccept] = useState<boolean>(false);
  const [showPopupReject, setshowPopupReject] = useState<boolean>(false);
  const [selectedInventory, setSelectedInventory]= useState<string>('')
  const [showPopupImage, setshowPopupImage] = useState<boolean>(false);
  const[SelectedRequestDetails,setSelectedRequestDetails] = useState<Request|null>(null);
  

  const handleInventoryChange = (inventoryId2: number,inventoryName:string) => {
    setSelectedInventory(inventoryName);
    setSelectedInventoryId(inventoryId2);
    setshowPopupAccept(true);
   
  };
  useEffect(() => {
    fetchRequestDetails();
}, [requestdetails]);

  const fetchRequestDetails = async () => {
    try {
      const url3 = `https://localhost:7166/api/request/requestby/${requestdetails.requestId}`;
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

  const handleAcceptClick = async (inventoryId2:number) => {
  
    if (inventoryId2 && requestdetails) {
     console.log(inventoryId2);
     console.log(requestdetails.requestId);
     
      try {
        
        const response = await axios.put(`https://localhost:7166/api/request/accept/${requestdetails.requestId}`, {
                InventoryId:inventoryId2,
                InventoryTypeId:requestdetails.inventoryTypeId,
                Inventory: requestdetails.inventory,
                Message: requestdetails.message,
                Reason:requestdetails.reason
        });

        if (response.status === 200) {
          console.log('Inventory assigned successfully');
        }
        setButtonsDisabled(true);
        setshowPopupAccept(false); 
      } catch (error) {
        console.error('Error assigning inventory:', error);
      }
    }
  };

  const handleConfirm = () => {
    handleAcceptClick(selectedInventoryId); // Actually perform the deletion
  };
  const handleClosePopupAccept = () => {
     setshowPopupAccept(false);
  };
  const handleClosePopupRejection = () => {
    setshowPopupReject(false);
 };
const  setRejectMethod = ()=>{
  setshowPopupReject(true);
}
  const handleClosePopup = () => {
    setshowPopupImage(false);
  };
  const handleImageView = () => {
    setshowPopupImage(true);
  };
  const setRejectButtonDisable = () => {
    setButtonsDisabled(true);
  }

  return (
    <div>
      <div className='inventory-card-containerForAccept'>
          {inventories.map((inventory: Inventory) => (
            <div key={inventory.inventoryId} className='inventoryDetailsForaccept' style={{display:"flex",justifyContent:"space-between",width:"900px"}}>
              <div className='dropDown-Icon-ForAccept'>
               <DropdownIcon size="30px" color="#00A7A7"/>
              </div>
              
              <div className='inventoryNameForAccept' style={{position:'relative',left:'-20px'}}>
                {inventory.inventoryName}
              </div>
                  <div className='InventoryImageForAccept'>
                    <img src={inventory.imageUrl} alt="Thumbnail" onClick={handleImageView} style={{ height: "80px", width: "90px", border:"none",borderRadius:"50%"}}/>
                    {showPopupImage&& (<ImagePopup handleClose={handleClosePopup} imageUrl={inventory.imageUrl} />)}
                  </div>
              
                <button className={`buttonForAccept ${buttonsDisabled||SelectedRequestDetails?.inventoryId != 0 ||SelectedRequestDetails?.rejected? 'disabled' : ''}`}onClick={() => handleInventoryChange(inventory.inventoryId,inventory.inventoryName)} disabled={buttonsDisabled||SelectedRequestDetails?.inventoryId != 0 || SelectedRequestDetails?.rejected}>
                  Accept 
                </button>
            </div>
          ))}
         
          <button className={`buttonForReject ${buttonsDisabled || SelectedRequestDetails?.inventoryId != 0||SelectedRequestDetails?.rejected ? 'disabled' : ''}`} type="button" onClick={setRejectMethod} disabled={buttonsDisabled || SelectedRequestDetails?.inventoryId != 0||SelectedRequestDetails?.rejected} >Reject</button>
        
        </div>
       

        {selectedInventoryId && showPopupAccept &&(
          <ShowAlertForAccept
             
              selectedInventory= {selectedInventory}
              handleClose={handleClosePopupAccept}
              handleConfirm={handleConfirm}
          />
      )}
       {showPopupReject && requestdetails &&(
        <RejectReason
        RejectId ={requestdetails.requestId}
        handleClose={handleClosePopupRejection}
        Reason={requestdetails.reason}
        Message={requestdetails.message}
        Inventory={requestdetails.inventory}
        buttonDisable = {setRejectButtonDisable}
        
       />
       )} 
      
    </div>
  );
};

export default CardForAccept;

