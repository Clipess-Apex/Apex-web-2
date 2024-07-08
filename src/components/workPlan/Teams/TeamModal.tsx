import React, { useState } from "react";
import { postTeam } from "../../../services/workPlan/TeamServices";
import { object, string, date } from "yup";
import "../../../styles/workPlan/Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const TeamModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const [TeamName, setTeamName] = useState("");
  const [Description, setDescription] = useState("");

  const teamSchema = object({
    teamName: string().required("Team Name is required"),
    description: string().required("Description is required"),
    createdDate: date().default(() => new Date()),
  });

  const teamData = {
    teamName: TeamName,
    description: Description,
    deleted: false,
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await teamSchema.validate(teamData, { abortEarly: false });
      await postTeam(teamData);
      toast.success("Team has been added");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error("Error adding Team");
      }
      console.error("Error adding Team:", error);
    }
  };

  return (
    <>
    <div className="TaskModal">
      {open && <div className="overlay" onClick={onClose}></div>}
      
      <dialog id="modal" open={open} onClose={onClose} className="modal">
        <div className="modal-title">Add Team</div>
        <br></br>
        <div className="form-container">
          <form className="modal-form">
            <label>Team Name :</label>
            <input
              type="text"
              value={TeamName}
              onChange={(event) => setTeamName(event.target.value)}
            />

            <label>Description : </label>
            <input
              type="text"
              value={Description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <br />
            <div className="modal-button">
              <button onClick={onClose} className="modal-cancel">
                Cancel
              </button>
              <button onClick={handleSave} className="modal-done">
                Done
              </button>
            </div>
          </form>
        </div>
      </dialog>
      </div>
    </>
  );
};

export default TeamModal;
