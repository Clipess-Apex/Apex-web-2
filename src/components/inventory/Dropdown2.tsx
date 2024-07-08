interface Props{
    size:string;
    color:string;
}
const DropdownIcon2:React.FC<Props> = ({size,color}) => {
    const iconStyle = {
        fontSize:size,
        color:color 
       
    }
    return <i className="fa-solid fa-circle-chevron-down" style = {iconStyle}></i>
    
};
export default DropdownIcon2;