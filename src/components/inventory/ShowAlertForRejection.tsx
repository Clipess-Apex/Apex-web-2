import "../../styles/inventory/ShowAlertType.css"

interface Props{
    
    
    handleClose:() => void;
    handleConfirm:() => void;
}

const ImagePopup:React.FC<Props> = ({handleClose,handleConfirm}) => {
    

    

    return (
        
           
            <>
                <div className ="modal2">
                    <div className ="modalContent2">
                        <h3 className ="DeleteHeading">Reject</h3>
                        <div  className ='message'>
                            <label style = {{zIndex:100,width:"1000px",height:"200px"}}>Are you sure you want to reject this request?</label>
                        </div>
                        
                        <button className='ConfirmButton' onClick={handleConfirm} style={{backgroundColor:"red",border:"2px solid red",borderRadius:"5px"}}>Reject</button>
                        <button  className= "CancelButton" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </>
        
    );
}

export default ImagePopup;
