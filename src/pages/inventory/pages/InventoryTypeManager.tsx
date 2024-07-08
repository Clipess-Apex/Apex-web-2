import { useState, useEffect, ChangeEvent } from 'react';
import '../../../styles/inventory/InventoryType.css';
import CardComponent from '../../../components/inventory/PopupInventoryType';
import InventoryTypeCard from '../../../components/inventory/InventoryTypeCard';
// import Header from '../../../components/shared/Header';
// import SideBar from '../../../components/shared/SideBar';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/inventory/PaginationInventory'

interface InventoryType {
  inventoryTypeId: number;
  inventoryTypeName: string;
  deletedBy:number;
}

function InventoryTypeManager() {

  const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
  const itemsPerPage = 5; // Number of items to display per page

  // State to manage currently displayed page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const navigate = useNavigate();

  const NavigateToInventoryTypePage = () => {
    navigate('/inventory');
  };


  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber); //To Update current page
    //setActivePage(pageNumber); // To Update active page
};

  useEffect(() => {
    fetchInventoryTypes();
  }, [inventoryTypes]); // Empty dependency array to fetch data only once on component mount

  const fetchInventoryTypes = async () => {
    try {
      const response = await fetch('https://localhost:7166/api/inventory_type/inventory_types');
      if (!response.ok) {
        throw new Error('Failed to fetch inventory types');
      }
      const data = await response.json();
      setInventoryTypes(data);
    } catch (error) {
      console.error('Error fetching inventory types:', error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const reversedInventoryTypes = [...inventoryTypes].reverse();
 
  // Calculate the number of pages based on filtered inventory types
  const filteredInventoryTypes = reversedInventoryTypes.filter(inventoryType =>
    inventoryType.inventoryTypeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedInventoryTypes: InventoryType[] = filteredInventoryTypes.slice(startIndex, endIndex);
 

  return (
    <>
      {/* <Header/>
      <SideBar/> */}

      <div className='inventoryTypePage'>


      <div className='heading-typePage'>
          <h2>Inventory Type Manager</h2>
      </div>
        
        <div className="search-bar-inventoryType">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "400px", height: "55px",borderRadius:"5px",border:"2px solid #00A7A7",fontSize:"20px"}}
          />
        </div>
        <div className="button-container-inventoryType">
                    <div className='NumberOfInventories-inventoryType'>
                        <h3 >{filteredInventoryTypes.length} items</h3>
                    </div>

                    <div>
                        <button type="button" className='add-button-inventoryType' onClick={togglePopup} ><i className="fa-solid fa-plus"></i> Add</button>
                    </div>
          </div>

       
       
        <div className='InventoryTypeList-inventoryType'>
        <InventoryTypeCard inventoryTypes={displayedInventoryTypes} /> {/* Pass filtered data */}
        </div>


        <div className='pagination-button-inventoryType'>

          <div className='paginationPart-inventoryType'>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredInventoryTypes.length / itemsPerPage)}
              onPageChange={handleClick}
            />
          </div>

          <div className='navigateButton-inventoryType'>
            <button onClick={NavigateToInventoryTypePage}><i className="fa-solid fa-arrow-left" style={{ color: "white" }}></i>  To Inventory</button>
          </div>
        </div>
        {showPopup && <CardComponent handleClose={togglePopup} />}
       
        
       
      </div>
    </>
  );
}

export default InventoryTypeManager;
