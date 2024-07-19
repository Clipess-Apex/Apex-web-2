
interface Props{
    size:string;
    color:string;
}
const DropdownIcon:React.FC<Props> = ({size,color }) => {
    const iconStyle = {
        fontSize:size,
        color:color 
}
    return <i className="fa-solid fa-circle-chevron-right" style={iconStyle}></i>

    
  };
export default DropdownIcon;
