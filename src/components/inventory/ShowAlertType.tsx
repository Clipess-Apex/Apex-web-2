import "../../styles/inventory/ShowAlertType.css"

interface Props{
    deletedInventoryType:string
    handleClose:() => void
    handleConfirm:() => void
}

const ImagePopup:React.FC<Props> = ({ deletedInventoryType, handleClose,handleConfirm}) => {
return (
        <>
                <div className ="modal2">
                    <div className ="modalContent2">
                        <h3 className ="DeleteHeading">Delete</h3>
                        <div  className ='message'>
                            <label >Are you sure you want to detete the inventoryType named '{ deletedInventoryType}' ?</label>
                        </div>
                        
                        <button className='ConfirmButton' onClick={handleConfirm}>Delete</button>
                        <button  className= "CancelButton" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </>
        
    );
}

export default ImagePopup;
