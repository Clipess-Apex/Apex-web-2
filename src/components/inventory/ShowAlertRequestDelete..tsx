
import "../../styles/inventory/ShowAlert.css"

interface Props{
    deletingRequest:string
    handleClose:() => void
    handleConfirm:() => void
}

const ImagePopup:React.FC<Props> = ({deletingRequest, handleClose,handleConfirm}) => {
    return (
        <>
            <div className="modal2">
                    <div className="modalContent2">
                        <h3 className ="DeleteHeading">Delete</h3>
                        <div  className='message'>
                            <label style = {{zIndex:100,width:"1000px",height:"200px"}}>Are you sure you want to detete your request for'{ deletingRequest}' ?</label>
                        </div>
                            <button className='ConfirmButton' onClick={handleConfirm}>Delete</button>
                            <button  className= "CancelButton" onClick={handleClose}>Cancel</button>
                    </div>
            </div>
        </>
        
    );
}

export default ImagePopup;



