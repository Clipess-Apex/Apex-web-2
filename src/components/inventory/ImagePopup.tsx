
import '../../styles/inventory/ImagePopup.css'; 

interface Props{
    imageUrl:string;
    handleClose:() => void;
}

const ImagePopup:React.FC<Props> = ({ imageUrl,handleClose }) => {
   

return (
        <div style={{zIndex:100}}>
           
            
                <div className="modal1">
                    <div className="modalContent1">
                        <span className="close" onClick={handleClose}>&times;</span>
                        <img src={imageUrl} alt="Full Size" className="modal-image"/>
                    </div>
                </div>
            
        </div>
    );
}

export default ImagePopup;
