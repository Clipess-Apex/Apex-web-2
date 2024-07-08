import React from 'react'
import '../../styles/inventory/CardForNavigate.css'
import { useNavigate } from 'react-router-dom';

interface CardProps {
    title: string;
    content:  React.ReactNode | string;
    icon: React.ReactNode;
    count: string;
    buttonContent:string;
    path:string;
  }
  
  const Card: React.FC<CardProps> = ({ title, content, icon,count,buttonContent,path}) => {

    const navigate = useNavigate();

    const NavigateToInventoryTypePage = () => {
      navigate(path);
    };
  
    return (
      <>
        <div className="card-inventory ">
          {/* <div className="card-icon">{icon}</div> */}
          <h2 className="card-title-inventory">{title}</h2>
          <div className='middle-part-inventory'>
          <div className="card-contet">{content}</div>
          <div className='card-detailCount'>{count}</div>
          </div>
          <button onClick={NavigateToInventoryTypePage}>{buttonContent}</button>
        </div>
      </>
    );
  }
  
  export default Card
           

           
            
               
           
                

                
            
            
           
            
            
            
