// import SideBar from '../../../components/shared/SideBar';
// import Header from '../../../components/shared/Header';
import Card from '../../../components/inventory/CardForNavigate'
import PieChart from '../../../components/inventory/PieChart';
import BarChart from '../../../components/inventory/BarChart';
import { useEffect, useState } from 'react';


  
  const InventoryDashboard: React.FC= () => {
    const [NoOfInventories, setNoOfInventories] = useState<string>('0');
    const [NoOfInventoryTypes,setNoOfInventoryTypes] = useState<string>('0');
    const [NoOfUnreadRequests, setNoOfUnreadRequests] = useState<string>('0');

    useEffect(()=>{
      getTotalNumberOfInventories();
      getTotalNumberOfUnreadRequests();
      getTotalNumberOfInventoryTypes();
    },[])

    const getTotalNumberOfInventories = async () => {
      try {
        const url = "https://localhost:7166/api/inventory/totalNoOfInventories";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.text(); // Use text() to read the response as plain text
       
        setNoOfInventories(data);
      } catch (error) {
        console.error('Error fetching inventory details:', error);
      }
  };

  const getTotalNumberOfInventoryTypes = async () => {
    try {
      const url = "https://localhost:7166/api/inventory_type/inventoryTypeCount";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      console.log()
      const data = await response.text(); // Use text() to read the response as plain text
      
      setNoOfInventoryTypes(data);
    } catch (error) {
      console.error('Error fetching inventory details:', error);
    }
};

const getTotalNumberOfUnreadRequests = async () => {
  try {
    const url = "https://localhost:7166/api/Request/NoOfUnreadRequests";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch details');
    }
    const data = await response.text(); // Use text() to read the response as plain text
    
    setNoOfUnreadRequests(data);
  } catch (error) {
    console.error('Error fetching inventory details:', error);
  }
};

  
    return (
      <>
     
      <div className='card-container-InventoryDash' 
       >
        <Card 
            title= "Inventory Manager"
            content = "Total"
            count = {NoOfInventories}
            icon= {<i className="fas fa-trash-alt"></i>}
            path= '/inventory/manager/inventory'
            buttonContent='View Inventory Details'
        />
         <Card 
            title= "Inventory Type Manager"
            content = "Total"
            count={NoOfInventoryTypes}
            icon= {<i className="fas fa-trash-alt"></i>}
             path= '/inventory/manager/inventorytype'
            buttonContent='View Inventory Types'
        />
         <Card 
            title= "Request Manager"
            content = { <i className="fa-regular fa-eye-slash" style={{color:"white",fontSize:"20px" }}></i>}
            count={NoOfUnreadRequests}
            icon= {<i className="fas fa-trash-alt"></i>}
             path= '/inventory/manager/inventoryrequestManager'
            buttonContent='View Requests'
        />
        </div>


        <div className='chart-container-inventorydashboard'>

        <div style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
        <BarChart/>
        </div>
        
        <div style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
        <PieChart/>
        </div>

        </div>
        
        
        
        
      </>
    );
  }
  
  export default InventoryDashboard;
           

           
            
               
           
                

                
            
            
           
            
            
            
