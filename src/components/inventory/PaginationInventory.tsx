import React from 'react';
import '../../styles/inventory/PaginationInventory.css'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; 

        if (totalPages <= maxVisiblePages) {
            // Show all page numbers if total pages are less than or equal to maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show the first page, the last page, the current page, and pages around the current page
            pageNumbers.push(1);

            if (currentPage > 3) {
                pageNumbers.push('...');
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((pageNumber, index) => (
            <button
                key={index}
                onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
                disabled={typeof pageNumber !== 'number'}
            >
                {pageNumber}
            </button>
        ));
    };

    return (
        <div className="pagination-inventoryManager">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                prev
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
