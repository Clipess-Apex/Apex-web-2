// RequestCardManagerView.tsx
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import DropdownIcon from './DropdownIcon';
import CardComponent3 from './RejectReason';
import DisplayDetailsField from './DisplayDetailsField';
import axios from 'axios';
import '../../styles/inventory/Popup.css';
import '../../styles/inventory/RequestViewManager.css';
import DisplayAreaField from './DisplayAreaField';
import { useNavigate } from 'react-router-dom';
//import CardComponent4 from '../pages/InventoryAssign';
import { Console } from 'console';

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
  employee:{
    firstName:string;
    lastName:string;
  }
}

interface Props {
  requests: Request[];
}

const RequestCardManagerView: React.FC<Props> = ({ requests }) => {
  const [selectedRequestId, setSelectedRequestId] = useState<number>(0);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<Request | null>(null);
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const [label, setLabel]= useState<string>("Mark As Read");
  //const [ReadTrue,setReadTrue] = useState<boolean>(false);
  
 
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequestDetails(selectedRequestId);
}, [selectedRequestDetails?.isRead]);

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

  const handleReadState = async (selectedRequestDetails: Request) => {
      try {
        
        if (selectedRequestDetails) {
          
          const res = await axios.put(`https://localhost:7166/api/Request/read/${selectedRequestDetails.requestId}`, {
            
            IsRead: true,
            Inventory: selectedRequestDetails.inventory,
            Message: selectedRequestDetails.message,
            Reason: selectedRequestDetails.reason
          });
         
          console.log(res);
          console.log("successful read");
          if (res.status === 200) {
            setSelectedRequestDetails({
              ...selectedRequestDetails,
              isRead: true
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    if (selectedRequestId) {
      fetchRequestDetails(selectedRequestId);
    }
  }, [selectedRequestId]);

  const toggleExpansion = (requestId: number) => {
    setExpandedRequestId(requestId === expandedRequestId ? null : requestId);
  };

  const handleCardClick = (requestId: number,selectedRequestDetails:Request) => {
    toggleExpansion(requestId);
    setSelectedRequestId(requestId);
    if(selectedRequestDetails?.rejected){
      setLabel('Rejected');}
    else if(selectedRequestDetails?.inventoryId != 0){
        setLabel('Accepted')
      }
      else if(selectedRequestDetails?.isRead){
        setLabel('Check Again')
      }
      else{
        setLabel('Mark As Read')
      }
  };

  

  const handleReadClick = (selectedRequestDetails: Request) => {
   
    
    
    setSelectedRequestDetails(selectedRequestDetails);
   
    handleReadState(selectedRequestDetails);
    
    if(selectedRequestDetails.inventoryId == 0 && !selectedRequestDetails.rejected){
      
      navigate('/inventory/manager/inventoryAssign', { state: { selectedRequestDetails } });
    }
    
  };

  const getCardClassName = (request: Request) => {
    if (!request.isRead ) {
      return 'initial-card-request unread';
    }
    if (request.rejected) {
      return 'initial-card-request rejected';
    }
    if(request.inventoryId !=0){
    return 'initial-card-request accepted';
    }
    if(request.isRead ){
      return 'initial-card-request pending';
    }
    
    
  };


  return (
    <div className="request-card-container">
      {requests.map((request) => (
        <div key={request.requestId}>
          <div
            className={`${getCardClassName(request)} ${expandedRequestId === request.requestId ? 'expanded' : ''}`}
            onClick={() => handleCardClick(request.requestId, request)}
          >
            <div>
              <ul>
                <li className="requestlist_init" style={{listStyleType:"none",marginTop:"-10px"}}>
                  <div className={`dropdowniconForRequest ${expandedRequestId === request.requestId ? 'expanded' : ''}`}>
                    <DropdownIcon size="30px" color="#00A7A7"/>
                  </div>
                  <div className ='requestlist_init-name' style={{width:"500px"}}>
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
          <div className = {`request-card-request ${expandedRequestId === request.requestId ? 'expanded' : ''}`}>
            {expandedRequestId === request.requestId && selectedRequestDetails &&
              selectedRequestDetails.requestId === request.requestId && (
                <div className="Requestdetails">
                  <div className='sectionOne' style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className='RequestedInventoryName-ex'>
                    <DisplayDetailsField
  width='500px'
  displayplaceholder="Requested Inventory Name"
  displayvalue={`${selectedRequestDetails.employee.firstName} ${selectedRequestDetails.employee.lastName}`}
/>

                    </div>
                    <div className='RequestedInventoryType-ex'>
                      <DisplayDetailsField
                        width='300px'
                        displayplaceholder="Requested Inventory Type"
                        displayvalue={selectedRequestDetails.inventoryType.inventoryTypeName}
                      />
                    </div>
                  </div>
                  <div className='RequestedDate-ex'>
                    <DisplayDetailsField
                      width='300px'
                      displayplaceholder="Requested Date"
                      displayvalue={selectedRequestDetails.createdDate.substring(0, 10)}
                    />
                  </div>
                  <div className=''>
                    <DisplayAreaField
                      width='500px'
                      height='150px'
                      displayplaceholder="Message"
                      displayvalue={selectedRequestDetails.message}
                    />
                  </div>
                  <div className='buttons'>
                    <button className={`readButton ${selectedRequestDetails.rejected || selectedRequestDetails.inventoryId!=0 ? 'disabled' : ''}`}  disabled={selectedRequestDetails.rejected || selectedRequestDetails.inventoryId!=0} onClick={() => handleReadClick(request)}>{label}</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestCardManagerView;
