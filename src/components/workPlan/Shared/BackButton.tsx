import { useNavigate } from "react-router-dom";
import "../../../styles/workPlan/BackButton.css";

interface AddButtonProps {
  buttonText: string;
}

const BackButton: React.FC<AddButtonProps> = ({ buttonText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="workplanBack">
        <button className="BackButton" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default BackButton;
