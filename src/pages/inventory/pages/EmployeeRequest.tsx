import { useState, useEffect } from 'react';
import InventoryCard from '../../../components/inventory/RequestDetailsCard';
import '../../../styles/inventory/EmployeeRequest.css';
import RequestForm from '../../../components/inventory/RequestForm'; 
import  '../../../styles/inventory/DropdownMenu.css'
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/inventory/PaginationInventory';

interface Request{
    requestId: number,
    employeeId: number,
    inventoryId:number,
    inventoryTypeId: number,
    message: string,
    inventory: string,
    isRead: boolean,
    deleted: boolean,
    rejected: boolean,
    reason: string,
    createdDate: string
    inventoryType:{
        inventoryTypeName:string
    }
    
}
function EmployeeRequest() {
    
    const [requests, setRequests] = useState<Request[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 2;
    const [activePage,setActivePage] = useState<number>(1);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
   
    
    
    const reversedrequests = [...requests].reverse();
    const navigate = useNavigate();

    const NavigateToInventoryTypePage = () => {
      navigate('/employee');
    };

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber); //To Update current page
        setActivePage(pageNumber); // To Update active page
    };
    useEffect(() => {
        FilteredRequestsFetch();
        
    }, [ currentPage,selectedFilter,requests]);

    

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    // To Calculate the start and end indexes for the current page
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    // To Slice the inventories array to display only the items for the current page
    const displayedRequests: Request[] = reversedrequests.slice(startIndex, endIndex);
     
    const FilteredRequestsFetch = async () => {
        try {
            let   url = 'https://localhost:7166/api/Request/allrequests/5';
  
            switch (selectedFilter) {
                case 'accepted':
                    url = 'https://localhost:7166/api/Request/acceptedrequests/5';
                    break;
                case 'rejected':
                    url = 'https://localhost:7166/api/Request/rejectedrequests/5';
                    break;
                case 'pending':
                    url = 'https://localhost:7166/api/Request/pendingrequests/5';
                    break;
                case 'unread':
                    url = 'https://localhost:7166/api/Request/notreadrequests/5';
                    break;
                case 'all':
                      url = 'https://localhost:7166/api/Request/allrequests/5';
                    break;
                default:
                   
            }
  
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data: Request[] = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
   
    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setCurrentPage(1);// Reset to first page on filter change
    }
return (
        <>
       <div className='container-main-InventoryRequest'>
            <div className='heading-InventoryRequest'>
                <h2 >My Requests</h2>
            </div>
                       
                        
            <div className="button-card-requestManager">
                    <div className={`req-button-card-item1 ${selectedFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
                        <div>All</div><br />
                        
                    </div>
                    <div className={`req-button-card-item2 ${selectedFilter === 'accepted' ? 'active' : ''}`} onClick={() => handleFilterChange('accepted')}>
                        <div>Accepted</div>
                       
                    </div>
                    <div className={`req-button-card-item3 ${selectedFilter === 'rejected' ? 'active' : ''}`} onClick={() => handleFilterChange('rejected')}>
                        <div>Rejected</div>
                    </div>
                    <div className={`req-button-card-item4 ${selectedFilter === 'pending' ? 'active' : ''}`} onClick={() => handleFilterChange('pending')}>
                        <div>Pending</div>
                        
                    </div>
                    <div className={`req-button-card-item5 ${selectedFilter === 'unread' ? 'active' : ''}`} onClick={() => handleFilterChange('unread')}>
                        <div>Unread</div>
                    </div>
                </div>
                      
            <div className='add-InventoryRequest-button'> 
                <div> </div> 
                <div>
                <button type="button" onClick={togglePopup} ><i className="fa-solid fa-plus"></i> Add</button>
                </div>
           
               
            </div>
               
              
              <div className='request-list-InventoryRequest'>
                    <InventoryCard requests = {displayedRequests}/>
              </div>
                
              <div className='pagination-container-InventoryRequest'>
                <div className="pagination-InventoryRequest">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(displayedRequests.length / itemsPerPage)}
                            onPageChange={handleClick}
                        />
                </div>
            
                <div>
                <button className='navigateButton-InventoryRequest' onClick={NavigateToInventoryTypePage}><i className="fa-solid fa-arrow-left" style={{color:"white"}}></i> My inventories </button>
              
                </div>
            </div>
                {showPopup && <RequestForm handleClose={togglePopup}/>} 
       
               
            </div> 
       
        </>
    );
}

export default EmployeeRequest;
