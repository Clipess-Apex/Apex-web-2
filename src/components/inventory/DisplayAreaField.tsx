import React from 'react';
import '../../styles/inventory/DisplayAreaField.css';
interface Props{
    displayplaceholder:string;
    displayvalue:string;
    width?:string;
    height?:string;
}

const DisplayAreaField:React.FC<Props>=({displayplaceholder, displayvalue,width,height}) => {
  const fieldStyle = {
    width:width,
    height:height
   
  }
  return (
    <div className='container-field2' style={fieldStyle}>
        <p className = 'placeholder2'>{displayplaceholder}</p>
        <label className = 'value2'>{displayvalue}</label>
      
    </div>
  )
}

export default DisplayAreaField;
