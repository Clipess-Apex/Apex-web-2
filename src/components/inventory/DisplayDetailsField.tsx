import React from 'react';
import '../../styles/inventory/DisplayDetailsField.css';
interface Props{
    displayplaceholder:string;
    displayvalue:string;
    width?:string;
    
}


const DisplayDetailsField:React.FC<Props>=({displayplaceholder, displayvalue, width}) => {
  const fieldStyle = {
    width:width
   
  }
  return (
    <div className='container-field' style={fieldStyle}>
        <p className = 'placeholder1'>{displayplaceholder}</p>
        <label className = 'value'>{displayvalue}</label>
      
    </div>
  )
}

export default DisplayDetailsField;
