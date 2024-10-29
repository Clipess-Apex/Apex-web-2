import React, { useEffect, useState } from "react";
import { editTeam, getTeam, getTeams, postTeam } from "../../../services/workPlan/TeamServices";
import { object, string, date } from "yup";
import "../../../styles/workPlan/Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Team } from "../../../models/workPlan/Team";

interface EditTeamModalProps {
  open: boolean;
  onClose: () => void;
  teamIndex: any;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ open, onClose,teamIndex }) => {
  const [TeamName, setTeamName] = useState("");
  const [Description, setDescription] = useState("");
  const [teams, setTeams] = useState<Team>();

  const teamSchema = object({
    teamName: string().required("Team Name is required"),
    description: string().required("Description is required"),
    createdDate: date().default(() => new Date()),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(teamIndex.teamId);
        const data = await getTeam(teamIndex.teamId);
        setTeams(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchData();

    
  }, []);

  const teamData = {
    teamName: TeamName,
    description: Description,
    deleted: false,
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await teamSchema.validate(teamData, { abortEarly: false });
      await editTeam(teamIndex.teamId,teamData);
      toast.success("Team has been updated");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error("Error updating Team");
      }
      console.error("Error updating Team:", error);
    }
  };

  return (
    <>
    <div className="TaskModal">
      {open && <div className="overlay" onClick={onClose}></div>}
      
      <dialog id="modal" open={open} onClose={onClose} className="modal">
        <div className="modal-title">Update Team</div>
        <br></br>
        <div className="form-container">
          <form className="modal-form">
            <label>Team Name :</label>
            <input
              type="text"
              defaultValue={teams?.teamName}
              value={TeamName}
              onChange={(event) => setTeamName(event.target.value)}
            />

            <label>Description : </label>
            <input
              type="text"
              defaultValue={teams?.description}
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

export default EditTeamModal;
