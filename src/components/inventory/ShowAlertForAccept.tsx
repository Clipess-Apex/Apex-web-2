import "../../styles/inventory/ShowAlertType.css"

interface Props{
    selectedInventory:string;
    handleClose:() => void;
    handleConfirm:() => void;
}

const ImagePopup:React.FC<Props> = ({ selectedInventory, handleClose,handleConfirm}) => {
return (
        
           
            <>
                <div className ="modal2">
                    <div className ="modalContent2">
                        <h3 className ="DeleteHeading">Assign</h3>
                        <div  className ='message'>
                            <label style = {{zIndex:100,width:"1000px",height:"200px"}}>Are you sure you want to assign the inventory named '{ selectedInventory}'  ?</label>
                        </div>
                        
                        <button className='ConfirmButton' onClick={handleConfirm} style={{backgroundColor:"green",border:"2px solid green",borderRadius:"5px"}}>Accept</button>
                        <button  className= "CancelButton" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </>
        
    );
}

export default ImagePopup;
