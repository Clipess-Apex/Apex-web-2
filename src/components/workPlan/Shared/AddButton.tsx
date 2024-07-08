import "../../../styles/workPlan/AddButton.css";

interface AddButtonProps {
  buttonText: string;
  onClick: any;
}

const AddButton: React.FC<AddButtonProps> = ({ buttonText, onClick }) => {
  return (
    <>
      <div className="workplanAdd">
        <button className="AddButton" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default AddButton;
