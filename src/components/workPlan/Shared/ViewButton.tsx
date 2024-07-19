import "../../../styles/workPlan/ViewButton.css";

interface AddButtonProps {
  buttonText: string;
  onClick: any;
}

const ViewButton: React.FC<AddButtonProps> = ({ buttonText, onClick }) => {
  return (
    <>
      <div className="workplanView">
        <button className="ViewButton" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default ViewButton;
