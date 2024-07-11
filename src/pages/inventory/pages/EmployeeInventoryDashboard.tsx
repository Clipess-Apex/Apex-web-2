import Card from '../../../components/inventory/CardForNavigate'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../providers/AuthContextProvider'
import { jwtDecode } from "jwt-decode";

interface DecodedToken{
  EmployeeID: string;
}
  
  const InventoryEmployeeDashboard: React.FC= () => {
    const [NoOfInventories, setNoOfInventories] = useState<string>('0');
    const [NoOfUnreadRequests, setNoOfUnreadRequests] = useState<string>('0');

    const { token } = useAuth();

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decodedToken);
  }

    useEffect(()=>{
      getTotalNumberOfInventories();
      getTotalNumberOfUnreadRequests();
   
    },[])

    const getTotalNumberOfInventories = async () => {
      try {
        const url = `https://localhost:7166/api/inventory/totalInventories/${decodedToken?.EmployeeID}`;
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
    const url = `https://localhost:7166/api/Request/NoOfUnreadRequestsforEmployee/${decodedToken?.EmployeeID}`;
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
<div>
    
<div style={{overflow:"hidden"}}>
     
      <div style={{position:"relative",top:"200px",left:"680px",zIndex:100}}>

      <Card 
          title= "My Requests"
          content = { <i className="fa-regular fa-eye-slash" style={{color:"white",fontSize:"20px" }}></i>}
          count={NoOfUnreadRequests}
          icon= {<i className="fas fa-trash-alt"></i>}
          path= '/inventory/employee/inventoryrequest'
          buttonContent='View Requests'
      />
      </div>
      <div style={{position:"relative",left:"150px"}}>
      <Card 
          title = "My Inventories"
          content = "Total"
          count = {NoOfInventories}
          icon = {<i className="fas fa-trash-alt"></i>}
          path = '/inventory/employee/employeeinventory'
          buttonContent = 'View Inventory Details'
      />
      </div>
     
      
      </div>


      </div>
      
      
      
    
    );
  }
  
  export default InventoryEmployeeDashboard;
           

           
            
               
           
                

                
            
            
           
            
            
            
