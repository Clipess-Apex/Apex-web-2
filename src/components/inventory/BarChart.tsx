import  { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface InventoryTypeCount {
  inventoryTypeId: number;
  count: number;
}

interface InventoryType {
  inventoryTypeId: number;
  inventoryTypeName: string;
}

const BarChart = () => {
  const [inventoryTypeCounts, setInventoryTypeCounts] = useState<InventoryTypeCount[]>([]);
  const [inventoryTypes, setInventoryTypes] = useState<InventoryType[]>([]);

  useEffect(() => {
    fetchInventoryTypeCounts();
    fetchInventoryTypes();
  },[]);

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

  const fetchInventoryTypeCounts = async () => {
    try {
      const response = await fetch('https://localhost:7166/api/inventory/countByType');
      if (!response.ok) {
        throw new Error('Failed to fetch inventory details');
      }
      const data: InventoryTypeCount[] = await response.json();
      setInventoryTypeCounts(data);
    } catch (error) {
      console.error('Error fetching inventory details:', error);
    }
  }

  

  const getInventoryTypeName = (inventoryTypeId: number) => {
    const inventory = inventoryTypes.find(type => type.inventoryTypeId === inventoryTypeId);
    return inventory ? inventory.inventoryTypeName : '';
  };

  const data = {
    labels: inventoryTypeCounts.map(item => getInventoryTypeName(item.inventoryTypeId)),
    datasets: [
      {
        label: 'Inventory Count',
        data: inventoryTypeCounts.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
   
  };

  return (
    <>
     
      
        <div style={{ width: '600px'}}>
          <Bar data={data} options={options} />
        </div>
     
    </>
  );
};

export default BarChart;
