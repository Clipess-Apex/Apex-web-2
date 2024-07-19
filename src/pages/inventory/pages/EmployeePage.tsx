import React, { useState, useEffect } from 'react';
import '../../../styles/inventory/EmployeeInventory.css';
import EmployeeInventories from '../../../components/inventory/EmployeeInventoryDetails'
import InventoryTypeSelect from '../../../components/inventory/InventoryTypeFilter';
import Pagination from '../../../components/inventory/PaginationInventory';
import { useNavigate } from 'react-router-dom';
import LottieAnimation from '../../../components/inventory/LotieAnimation';  
import { useAuth } from '../../../providers/AuthContextProvider'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}


interface Inventory {
    inventoryId: number;
    employeeId:number;
    inventoryTypeId: number;
    inventoryName: string;
    inventoryType: {
        inventoryTypeName:string;
    }
    employee: {
        firstName: string;
        lastName: string;
    };
    fileUrl: string;
    imageUrl: string;
    assignedDate: string;
   
}

interface DecodedToken{
    EmployeeID: string;
  }

  interface Notification {
    userNotificationId: number;
    employeeId: number;
    notification:string;
    IsRead:boolean}

function InventoryFilter() {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [notifications, setNotfications] = useState<Notification[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [SelectedNotification, setSelectedNotification] = useState<Notification>();
    const [activePage, setActivePage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(0);
    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber); //To  Update current page
        setActivePage(pageNumber); // To Update active page
    };

  const { token } = useAuth();

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decodedToken);
  }

    const navigate = useNavigate();

    const NavigateToInventoryTypePage = () => {
        navigate('/inventorytype');
    };

    useEffect(() => {
       
        fetchInventoryTypes();
        
    }, []);
    useEffect(() => {
       
        fetchInventories();
    }, [currentPage]);

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

    const fetchInventories = async () => {
        try {
            let url = 'https://localhost:7166/api/inventory/filter';
            url += `/employee/${decodedToken?.EmployeeID}`;
            if(selectedInventoryTypeId){
                url += `/type/${selectedInventoryTypeId}/${decodedToken?.EmployeeID}`
            }
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

   
   
  

    const filteredInventories = inventories.filter(inventory => {
        return inventory.inventoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // To Calculate the start and end indexes for the current page
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    // To Slice the inventories array to display only the items for the current page
    const displayedInventories: Inventory[] = filteredInventories.slice(startIndex, endIndex);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
    };
  
    const handleNotificationHide = (notification: Notification) => {
            setSelectedNotification(notification);
          
    }
   

    return (
        <>
      
        <div className='container-main-employeeInventory'>
            <h2 className='heading-employeeInventory'>My Inventory Details</h2>
           
            <div className='Inventory-notification-container' style={{backgroundColor:"red",color:"white"}}>
                {notifications.map((notification) => (
                    <div>
                        <div> {notification.notification} </div>
                        <button onClick={() => handleNotificationHide(notification)} >Hide</button>
                    </div>
                ))}
        </div>
          
          <div className='search-bar-container-employeeInventory'>
                    <div className='search-bar-employeeInventory'>
                        <input
                            type="text"
                            placeholder="Search by inventory name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{width:"250px", height:"60px", borderRadius:"5px",border:"2px solid #00A7A7"}}
                        /> 

                        </div>
                        <div>
                            <InventoryTypeSelect
                                inventoryTypes={inventoryTypes}
                                selectedInventoryTypeId={selectedInventoryTypeId}
                                handleInventoryTypeChange={handleInventoryTypeChange}
                                AllOrNone="All"
                            />
                        </div>

            </div>
            <div className='requestManager-request-list'>
                    {displayedInventories.length > 0 ? (
                        <div className='inventory-list-employeeInventory'>
                        <EmployeeInventories inventories={displayedInventories}/>
                </div>
                    ) : (
                        <div className='no-requests-message-requestManager'>
                            <h2>No inventories</h2>
                            <div>
                                <LottieAnimation height="100px" width="100px"/>
                            </div>
                        </div>
                    )}
                </div>
                

                <div className='pagination-container-employeeInventory'>
                    <div className='pagination-buton-employeeInventory'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredInventories.length / itemsPerPage)}
                            onPageChange={handleClick}
                        />
                    </div>

                    <div className='navigation-button-employeeInventory'>
                        <button onClick={NavigateToInventoryTypePage}>Back To Dashboard</button>
                    </div>
                </div>
             

                
        </div>
        </>
    );
}

export default InventoryFilter;
           

           
            
               
           
                

                
            
            
           
            
            
            
