import React, { useState, useEffect } from 'react';
import '../../styles/inventory/Popup.css';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import CardComponent_Type from './EditInventoryType';
import '../../styles/inventory/TypeExpand.css';
import axios from 'axios';
import ShowAlertType from './ShowAlertType';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InventoryType {
  inventoryTypeId: number;
  inventoryTypeName: string;
  deletedBy: number;
  reportUrl?: string;
}

interface Props {
  inventoryTypes: InventoryType[];
}

interface Count {
  inventoryTypeId: number;
  count: number;
}

const InventoryTypeCard: React.FC<Props> = ({ inventoryTypes }) => {
  const [selectedInventoryType, setSelectedInventoryType] = useState<InventoryType | null>(null);
  const [selectedEditId, setSelectedEditId] = useState<number | null>(null);
  const [counts, setCounts] = useState<Count[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showPopup2, setShowPopup2] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<string>('');

  useEffect(() => {
    fetchInventoryCounts();
  }, []);

  const fetchInventoryCounts = async () => {
    try {
      const url3 = `https://localhost:7166/api/inventory/inventoriesCountByType`;
      const response = await fetch(url3);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory count');
      }
      const data: Count[] = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching inventory counts:', error);
    }
  };

  

  const getCountByInventoryTypeId = (inventoryTypeId: number) => {
    const countItem = counts.find((count) => count.inventoryTypeId === inventoryTypeId);
    return countItem ? countItem.count : 0;
  };

  const handleDelete = async (deleteType: string) => {
    try {
      if (deleteId) {
        const data = {
          Deleted: true,
          DeletedBy: 8,
          InventoryTypeName: deleteType,
        };
        const response = await axios.put(`https://localhost:7166/api/inventory_type/delete/${deleteId}`, data);

        console.log(response);
        if (response.status === 200) {
          toast.success('Inventory type deleted successfully');
          setDeleteId(null); // Clear the deleteId to close the popup
          setShowPopup2(false); // Close the popup after deletion
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

     

  const handleDeleteClick = (deleteId: number, deleteType: string) => {
    setDeleteId(deleteId);
    setShowPopup2(true);
    setDeleteType(deleteType);
  };

  const handleEditClick = (inventoryTypeId: number, inventoryType: InventoryType) => {
    setSelectedInventoryType(inventoryType);
    setSelectedEditId(inventoryTypeId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    handleDelete(deleteType); // Actually perform the deletion
  };

  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  const handleReportGeneration = async (inventoryTypeId: number) => {
    const reportDetails = await fetchInventoryTypeDetails(inventoryTypeId);
    if (reportDetails && reportDetails.reportUrl) {
      window.open(reportDetails.reportUrl, '_blank');
    } else {
      toast.error('Failed to generate report');
    }
  };

  const fetchInventoryTypeDetails = async (reportId: number) => {
    try {
      const url3 = `https://localhost:7166/api/Report/${reportId}`;
      const response = await fetch(url3);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory details');
      }
      const data: InventoryType = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching inventory details:', error);
      return null;
    }
  };

  return (
    <div className="container-inventoryType-card">
      <ToastContainer />
      {inventoryTypes.map((inventoryType) => (
        <div key={inventoryType.inventoryTypeId} className="initial-card-inventoryType-card">
          <div className="inventoryTypeName-inventoryType-card">{inventoryType.inventoryTypeName}</div>
          <div className="button_arrange-inventoryType-card">
            <button
              className={`viewReport-Button-inventoryType-card ${getCountByInventoryTypeId(inventoryType.inventoryTypeId) === 0 ? 'disabled' : ''}`}
              onClick={() => handleReportGeneration(inventoryType.inventoryTypeId)}
              disabled={getCountByInventoryTypeId(inventoryType.inventoryTypeId) === 0}
            >
              View report
            </button>
            <button
              style={{
                backgroundColor: 'white',
                border: 'white',
              }}
              onClick={() => handleDeleteClick(inventoryType.inventoryTypeId, inventoryType.inventoryTypeName)}
            >
              <DeleteIcon size="30px" color="red" />
            </button>
            <button
              style={{
                backgroundColor: 'white',
                border: 'white',
              }}
              onClick={() => handleEditClick(inventoryType.inventoryTypeId, inventoryType)}
            >
              <EditIcon size="30px" color="black"/>
            </button>
          </div>
        </div>
      ))}
      {selectedInventoryType && selectedEditId && showPopup && (
        <CardComponent_Type
          inventoryTypeName={selectedInventoryType.inventoryTypeName}
          selectedEditId={selectedEditId}
          handleClose={handleClosePopup}
        />
      )}
      {deleteId && showPopup2 && deleteType && (
        <ShowAlertType
          deletedInventoryType={deleteType}
          handleClose={handleClosePopup2}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default InventoryTypeCard;

