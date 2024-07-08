import React, { useState, useEffect } from 'react';
import InventoryCard from '../../../components/inventory/InventoryDetails';
import '../../../styles/inventory/InventoryManager.css';
import CardComponent from '../../../components/inventory/PopupCard';
import EmployeeSelect from '../../../components/inventory/EmployeeFilter';
import InventoryTypeSelect from '../../../components/inventory/InventoryTypeFilter';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/inventory/PaginationInventory';
import LottieAnimation from '../../../components/inventory/LotieAnimation';

interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
}
interface InventoryType {
    inventoryTypeId: number;
    inventoryTypeName: string;
}
interface Inventory {
    inventoryId: number;
    employeeId: number;
    inventoryTypeId: number;
    inventoryName: string;
    inventoryType: {
        inventoryTypeName: string;
    }
    employee: {
        firstName: string;
        lastName: string;
    };
    fileUrl: string;
    imageUrl: string;
    assignedDate: string;
}
function InventoryManager() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
    const [selectedInventoryTypeId, setSelectedInventoryTypeId] = useState<number>(0);
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const [activePage, setActivePage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();

    const NavigateToInventoryTypePage = () => {
        navigate('/inventorytype');
    };

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber); //To Update current page
        setActivePage(pageNumber); // To Update active page
    };

    useEffect(() => {

        fetchInventories();
    }, [selectedEmployeeId, selectedInventoryTypeId, currentPage]);



    useEffect(() => {
        fetchEmployees();
        fetchInventoryTypes();
    }, []);


    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/employee/Employee');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data: Employee[] = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

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
            if (!selectedInventoryTypeId && !selectedEmployeeId) {
                url = 'https://localhost:7166/api/inventory/filter/employee';
            } else {
                if (selectedInventoryTypeId && selectedEmployeeId) {
                    url += `/type/${selectedInventoryTypeId}/${selectedEmployeeId}`;
                } else if (selectedInventoryTypeId) {
                    url += `/type/${selectedInventoryTypeId}`;
                } else if (selectedEmployeeId) {
                    url += `/employee/${selectedEmployeeId}`;
                }
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

    const handleEmployeeChange = (selectedEmployeeId: number) => {
        setSelectedEmployeeId(selectedEmployeeId);
    };

    const handleInventoryTypeChange = (selectedInventoryTypeId: number) => {
        setSelectedInventoryTypeId(selectedInventoryTypeId);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const reversedInventories = [...inventories].reverse();

    const filteredInventories = reversedInventories.filter(inventory => {
        return inventory.inventoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // To Calculate the start and end indexes for the current page
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    // To Slice the inventories array to display only the items for the current page
    const displayedInventories: Inventory[] = filteredInventories.slice(startIndex, endIndex);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };


    return (
        <>

          

            <div className="InventoryManagerPage">

                

                <div className="filtering-section">
                <div className="heading">
                    <h2 >Inventory Manager</h2>
                </div>

                    <div style={{marginTop:"40px"}}>
                        <EmployeeSelect
                            employees={employees}
                            selectedEmployeeId={selectedEmployeeId}
                            handleEmployeeChange={handleEmployeeChange}
                            AllOrNone="All"
                        />
                    </div>

                    <div style={{marginTop:"40px"}}>
                        <InventoryTypeSelect
                            inventoryTypes={inventoryTypes}
                            selectedInventoryTypeId={selectedInventoryTypeId}
                            handleInventoryTypeChange={handleInventoryTypeChange}
                            AllOrNone="All"
                        />
                    </div>
                    <div style={{marginTop:"40px"}}>
                        <input
                            type="text"
                            className='search-bar-InventoryPage'
                            placeholder="Search by inventory name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ width: "280px", height: "60px", borderRadius: "5px", border: "2px solid #00A7A7", fontSize: "20px" }}
                        />

                    </div>


                </div>

                <div className="button-container">
                    <div className='NumberOfInventories-InventoryPage'>
                        <h3 >{filteredInventories.length} items</h3>
                    </div>

                    <div>
                        <button type="button" className ='add-button-inventorypage' onClick={togglePopup} ><i className="fa-solid fa-plus"></i> Add</button>
                    </div>
                </div>
                <div className='InventoryManager-inventory-list'>
                    {filteredInventories.length > 0 ? (
                         <div className="inventoryCardContainer">
                         <InventoryCard inventories={displayedInventories}/>
                         </div>
                    ) : (
                        <div className='no-requests-message'>
                            <h2>No inventories</h2>
                            <div>
                                <LottieAnimation height="100px" width="100px" />
                            </div>
                        </div>
                    )}
                </div>



               


                <div className='pagination-container'>
                    <div className='pagination-buton-inventoryPage'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredInventories.length / itemsPerPage)}
                            onPageChange={handleClick}
                        />
                    </div>

                    <div className='navigation-button'>
                        <button onClick={NavigateToInventoryTypePage}>Inventory Types<i className="fa-solid fa-arrow-right" style={{ color: "white" }}></i></button>
                    </div>
                </div>


           {showPopup && <CardComponent handleClose={togglePopup}/>} 

            </div>

        </>
    );
}

export default InventoryManager;
