import Card from '../../../components/inventory/CardForNavigate'
import { useEffect, useState } from 'react';


  
  const InventoryEmployeeDashboard: React.FC= () => {
    const [NoOfInventories, setNoOfInventories] = useState<string>('0');
    const [NoOfUnreadRequests, setNoOfUnreadRequests] = useState<string>('0');

    useEffect(()=>{
      getTotalNumberOfInventories();
      getTotalNumberOfUnreadRequests();
   
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
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
    
<div style={{display:"flex",justifyContent:"space-around", alignItems:"center",gap:"200px"}}>
      {/* <Card 
          title= "Inventory Manager"
          content = "Total"
          count = {NoOfInventories}
          icon= {<i className="fas fa-trash-alt"></i>}
          path= '/inventory'
          buttonContent='View Inventory Details'
      />
     
     
       <Card 
          title= "Request Manager"
          content = { <i className="fa-regular fa-eye-slash" style={{color:"white",fontSize:"20px" }}></i>}
          count={NoOfUnreadRequests}
          icon= {<i className="fas fa-trash-alt"></i>}
           path= '/inventoryrequestmanager'
          buttonContent='View Requests'
      /> */}
      <div style={{height:"300px"}}>

      <Card 
          title= "Request Manager"
          content = { <i className="fa-regular fa-eye-slash" style={{color:"white",fontSize:"20px" }}></i>}
          count={NoOfUnreadRequests}
          icon= {<i className="fas fa-trash-alt"></i>}
           path= '/inventory/employee/inventoryrequest'
          buttonContent='View Requests'
      />
      </div>
      <div style={{height:"300px"}}>
      <Card 
          title= "Inventory Manager"
          content = "Total"
          count = {NoOfInventories}
          icon= {<i className="fas fa-trash-alt"></i>}
          path= '/inventory/employee/employeeinventory'
          buttonContent='View Inventory Details'
      />
      </div>
     
      
      </div>


      </div>
      
      
      
    
    );
  }
  
  export default InventoryEmployeeDashboard;
           

           
            
               
           
                

                
            
            
           
            
            
            
