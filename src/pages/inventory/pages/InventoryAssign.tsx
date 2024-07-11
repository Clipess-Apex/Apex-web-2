// InventoryFilter.tsx
import React, { useState, useEffect } from 'react';
import '../../../styles/inventory/InventoryAssign.css';
import InventoryCardForAccept from '../../../components/inventory/InventoryCardForAccept';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/inventory/PaginationInventory';
import LottieAnimation from '../../../components/inventory/LotieAnimation';

interface Request {
  requestId: number;
  employeeId: number;
  inventoryId:number;
  inventoryTypeId: number;
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
  employeeId: number;
  inventoryTypeId: number;
  inventoryName: string;
  inventoryType: {
    inventoryTypeName: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  };
  fileUrl: string;
  imageUrl: string;
  assignedDate: string;
}

const InventoryFilter: React.FC = () => {
  const [Unassignedinventories, setUnussignedInventories] = useState<Inventory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const location = useLocation();
  const { state } = location;
  const selectedRequestDetails: Request= state?.selectedRequestDetails;

  const navigate = useNavigate();

  const NavigateToInventoryTypePage = () => {
    navigate('/inventory/manager/inventoryrequestManager');
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  useEffect(() => {
    fetchInventories();
  }, [currentPage]);

  const fetchInventories = async () => {
    try {
      const url = `https://localhost:7166/api/inventory/unassigned/${selectedRequestDetails.inventoryTypeId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch inventories');
      }
      const data: Inventory[] = await response.json();
      setUnussignedInventories(data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const filteredInventories = Unassignedinventories.filter(inventory => {
    return inventory.inventoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const displayedInventories: Inventory[] = filteredInventories.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
 

  return (
    <>
      
      <div className='container-main-InventoryAssign'>

        <div>
          <h2 className='heading-InventoryAssign'>Inventory Assign</h2>
        </div>

        <div className='search-bar-InventoryAssign'>
        
        <div className='unassigned-inventory-length'>
          total {Unassignedinventories.length}
        </div>
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
       
      </div>
      
      <div className="inventory-list-InventoryAssign">
                         <InventoryCardForAccept
                          inventories={displayedInventories}
                          requestdetails= {selectedRequestDetails}
                          />
      </div>
        
        <div className='pagination-container-inventoryAssign'>
                    <div className='pagination-buton-inventoryAssign'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredInventories.length / itemsPerPage)}
                            onPageChange={handleClick}
                        />
                    </div>
        <div>
            <button onClick={NavigateToInventoryTypePage} className='navigateButton-InventoryAssign'>Back</button>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default InventoryFilter;
