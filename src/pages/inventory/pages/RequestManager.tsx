import React, { useState, useEffect } from 'react';
import InventoryCard from '../../../components/inventory/RequestViewManager';
import '../../../styles/inventory/RequestManager.css';
import '../../../styles/inventory/DropdownMenu.css';
import { useNavigate } from 'react-router-dom';
import LottieAnimation from '../../../components/inventory/LotieAnimation';
import Pagination from '../../../components/inventory/PaginationInventory';

interface Request {
    requestId: number;
    employeeId: number;
    inventoryTypeId: number;
    inventoryId: number;
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
    employee: {
        firstName: string;
        lastName: string;
    }
}

function RequestManager() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState(false);
    const itemsPerPage: number = 4;
    const [activePage, setActivePage] = useState<number>(1);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [requestCounts, setRequestCounts] = useState({
        unreadRequests: 0,
        totalRequests: 0,
        acceptedRequests: 0,
        rejectedRequests: 0,
        pendingRequests: 0,
    });

    const reversedRequests = [...requests].reverse();

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setActivePage(pageNumber);
    };

    const navigate = useNavigate();

    const NavigateToInventoryTypePage = () => {
        navigate('/');
    };

    useEffect(() => {
        FilteredRequestsFetch();
    }, [selectedFilter, currentPage]);

    useEffect(() => {
        fetchRequestCounts();
    }, []);

    const fetchRequestCounts = async () => {
        try {
            const response = await fetch('https://localhost:7166/api/Request/requestCounts');
            if (!response.ok) {
                throw new Error('Failed to fetch request counts');
            }
            const data = await response.json();
            setRequestCounts(data);
        } catch (error) {
            console.error('Error fetching request counts:', error);
        }
    };

    const FilteredRequestsFetch = async () => {
        try {
            let url = 'https://localhost:7166/api/Request/Request';

            switch (selectedFilter) {
                case 'accepted':
                    url = 'https://localhost:7166/api/Request/acceptedrequests';
                    break;
                case 'rejected':
                    url = 'https://localhost:7166/api/Request/rejectedrequests';
                    break;
                case 'pending':
                    url = 'https://localhost:7166/api/Request/pendingrequests';
                    break;
                case 'unread':
                    url = 'https://localhost:7166/api/Request/notreadrequests';
                    break;
                default:
                    url = 'https://localhost:7166/api/Request/Request';
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            if (response.status === 204) { // No content
                setRequests([]);
            } else {
                const data: Request[] = await response.json();
                setRequests(data);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    const displayedRequests: Request[] = reversedRequests.slice(startIndex, endIndex);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setCurrentPage(1); // Reset to first page on filter change
    };

    return (
        <>
            <div className='container-requestManager'>
                <div className='heading-requestManager'>
                    <h2>Request Manager</h2>
                </div>
                <div className="button-card-requestManager">
                    <div className={`req-button-card-item1 ${selectedFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
                        <div>All</div><br />
                        <div>{requestCounts.totalRequests}</div>
                    </div>
                    <div className={`req-button-card-item2 ${selectedFilter === 'accepted' ? 'active' : ''}`} onClick={() => handleFilterChange('accepted')}>
                        <div>Accepted</div>
                        <div>{requestCounts.acceptedRequests}</div>
                    </div>
                    <div className={`req-button-card-item3 ${selectedFilter === 'rejected' ? 'active' : ''}`} onClick={() => handleFilterChange('rejected')}>
                        <div>Rejected</div>
                        <div>{requestCounts.rejectedRequests}</div>
                    </div>
                    <div className={`req-button-card-item4 ${selectedFilter === 'pending' ? 'active' : ''}`} onClick={() => handleFilterChange('pending')}>
                        <div>Pending</div>
                        <div>{requestCounts.pendingRequests}</div>
                    </div>
                    <div className={`req-button-card-item5 ${selectedFilter === 'unread' ? 'active' : ''}`} onClick={() => handleFilterChange('unread')}>
                        <div>Unread</div>
                        <div>{requestCounts.unreadRequests}</div>
                    </div>
                </div>
                <div className='requestManager-request-list'>
                    {displayedRequests.length > 0 ? (
                        <div className='requestManager-request-list-item'>
                            <InventoryCard requests={displayedRequests} />
                        </div>
                    ) : (
                        <div className='no-requests-message-requestManager'>
                            <h2>No {selectedFilter} requests</h2>
                            <div>
                                <LottieAnimation height="100px" width="100px"/>
                            </div>
                        </div>
                    )}
                </div>
                <div className='pagination-navigation-requestManager'>
                    <div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(requests.length / itemsPerPage)}
                            onPageChange={handleClick}
                        />
                    </div>
                    <div className='navigateButton-requestManager'>
                        <button onClick={NavigateToInventoryTypePage} className='navigateButton-requestManager'>
                            <i className="fa-solid fa-arrow-left" style={{ color: "white" }}></i> To inventory
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RequestManager;

