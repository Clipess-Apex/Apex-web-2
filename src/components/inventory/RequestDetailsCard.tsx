
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import DropdownIcon from './DropdownIcon';
import CardComponent from './EditRequests';
import ShowAlert from './ShowAlertRequestDelete.';
import DisplayDetailsField from './DisplayDetailsField';
import axios from 'axios';

import '../../styles/inventory/RequestDetails.css';
import DisplayAreaField from './DisplayAreaField'

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

interface Props {
  requests: Request[];
}

const InventoryRequestCard: React.FC<Props> = ({ requests }) => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<Request>();
  const [selectedEditId, setSelectedEditId] = useState<number | null>(null);
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopup2, setShowPopup2] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchRequestDetails = async (requestId: number) => {
    try {
      const url3 = `https://localhost:7166/api/request/requestby/${requestId}`;
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

  useEffect(() => {
    if (selectedRequestId) {
      fetchRequestDetails(selectedRequestId);
    }
  }, [selectedRequestId,selectedRequestDetails]);

  const handleDelete = async (selectedRequestDetails:Request) => {
    try {
      
      if (deleteId) {
        const res = await axios.put(`https://localhost:7166/api/Request/delete/${deleteId}`, {
          Deleted: true,
          Inventory: selectedRequestDetails.inventory,
          Message: selectedRequestDetails.message,
          Reason: selectedRequestDetails.reason
          
        });
        console.log(res);
        if (res.status === 200) {
          toast.success('Inventory deleted successfully');
          setDeleteId(null); // Clear the deleteId to close the popup
          setShowPopup2(false); // Close the popup after deletion
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleExpansion = (requestId: number) => {
    setExpandedRequestId(requestId === expandedRequestId ? null : requestId);
  };

  const handleCardClick = (requestId: number) => {
    toggleExpansion(requestId);
    setSelectedRequestId(requestId);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  const handleEditClick = (editId: number) => {
    setSelectedEditId(editId);
    setShowPopup(true);
  };

  const handleDeleteClick = (deleteId: number) => {
    setDeleteId(deleteId);
    setShowPopup2(true);
  };

  const handleConfirm = () => {
    if (selectedRequestDetails) {
      handleDelete(selectedRequestDetails);
    }
  };

  return (
    <div className="RequestDetails-card-container">
      <ToastContainer />
      {requests.map((request) => (
        <div key={request.requestId}>
          <div
            className={`initial-card-requestDetails ${expandedRequestId === request.requestId ? 'expanded' : ''}`}
            onClick={() => handleCardClick(request.requestId)}
          >
            <div>
              <ul>
                <li className="inventorylistForRequest_init">
                  <div className={`dropdownicon ${expandedRequestId === request.requestId ? 'expanded' : ''}`}>
                    <DropdownIcon size="30px" color="#00A7A7" />
                  </div>
                  <div className='inventorylistForRequest-name' style={{width:"500px"}}>
                    {request.inventory}
                  </div>
                  <div className ='request-status-icon-requestDetails' style={{position:"relative",bottom:"10px"}}>
                    {request.inventoryId!= 0 ? (
                      <div className ='icon-container'>
                       <label className ='labelForAccept-requestCard'>Accepted</label>
                      </div>
                      
                    ) : request.rejected ? (
                      <div className='icon-container'>
                      <label className='labelForReject-requestCard'>Rejected</label>
                    </div>
                     
                    ) : request.isRead ?(
                      <div className='icon-container'>
                        <label className='buttonForPending-requestCard'>Pending</label>
                      </div>
                     
                    ): (
                      
                      <div className='icon-container'>
                       <label className='buttonForUnread-requestCard'>Unread</label>
                      </div>
                    )}
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className={`inventory-card-requestDetails ${expandedRequestId === request.requestId ? 'expanded' : ''}`}>
            {expandedRequestId === request.requestId && selectedRequestDetails &&
              selectedRequestDetails.requestId === request.requestId && (
                <div className="otherdetails-requestDetails">
                  <div className='RequestedInventoryTypeForRequest-ex'>
                    <DisplayDetailsField
                      displayplaceholder="Requested Inventory Type"
                      width="300px"
                      displayvalue={selectedRequestDetails.inventoryType.inventoryTypeName}
                    />
                  </div>
                  <div className = 'inventoryRequestedDate'>
                    <DisplayDetailsField
                      displayplaceholder="Requested Date"
                      width="250px"
                      displayvalue={selectedRequestDetails.createdDate.substring(0, 10)}
                    />
                  </div>

                  <div className='buttons-requesteddetail' style={{width:'100px',display:'flex',justifyContent:"space-between"}}>
                    <button
                     disabled={selectedRequestDetails.isRead}
                     style={{ width: "30px", backgroundColor: "white", border: "white" }} 
                     onClick={() => handleDeleteClick(request.requestId)}>
                      {selectedRequestDetails.isRead?(<DeleteIcon size="30px" color="gray" />):(<DeleteIcon size="30px" color="red" />)}
                    </button>
                    
                    <button 
                     disabled={selectedRequestDetails.isRead} 
                     style={{ width: "30px", backgroundColor: "white", border: "white"}} 
                     onClick={() => handleEditClick(request.requestId)}>
                     {selectedRequestDetails.isRead?(<EditIcon size="30px" color="gray" />):(<EditIcon size="30px" color="black" />)}
                    </button> 
                  </div>

                  
                  <div className = 'requestedMessage'>
                    <DisplayAreaField
                    displayplaceholder="Message"
                    width='720px'
                    height='80px'
                    displayvalue={selectedRequestDetails.message}
                    
                    />
                  </div>
                  
                   <div className = 'requestedreason'>
                    {selectedRequestDetails.rejected?(<DisplayAreaField
                    displayplaceholder="reason"
                    width='720px'
                    height='80px'
                    displayvalue={selectedRequestDetails.reason}
                    
                    />):<div>
                      
                      </div>}
                  </div>
                 </div> 
              )}
          </div>
        </div>
      ))}
       <div>
            {selectedRequestDetails && selectedEditId && showPopup && (
                <CardComponent
                    inventoryType={selectedRequestDetails.inventoryType.inventoryTypeName}
                    inventory={selectedRequestDetails.inventory}
                    InventoryTypeId={selectedRequestDetails.inventoryTypeId}
                    selectedEditId={selectedEditId}
                    message={selectedRequestDetails.message}
                    reason = {selectedRequestDetails.reason}
                    handleClose={handleClosePopup}
                />
            )}
        </div>

      {deleteId && showPopup2 && selectedRequestDetails && (
        <ShowAlert
          deletingRequest={selectedRequestDetails.inventory}
          handleClose={handleClosePopup2}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default InventoryRequestCard;

