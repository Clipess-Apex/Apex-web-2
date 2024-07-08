import React, { useState, useEffect } from "react";
import { postProject } from "../../../services/workPlan/ProjectServices";
import { object, string, number, date } from "yup";
import "../../../styles/workPlan/Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormClient } from "../../../models/workPlan/FormClient";
import { getFormClients } from "../../../services/workPlan/TaskModalServices";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const [ProjectName, setProjectName] = useState("");
  const [StartDate, setStartDate] = useState(Date);
  const [EndDate, setEndDate] = useState(Date);
  const [ClientId, setClientId] = useState("");
  const [Description, setDescription] = useState("");
  const [Budget, setBudget] = useState("");
  const [DocumentURL, setDocumentURL] = useState("");
  const [clients, setClients] = useState<FormClient[]>([]);

  const projectSchema = object({
    ProjectName: string().required("Project Name is required"),
    Budget: number().nullable().positive().integer(),
    ClientId: string().required("Client is required"),
    Description: string().required("Description is required"),
    StartDate: date().default(() => new Date()),
    EndDate: date().default(() => new Date()),
    CreatedDate: date().default(() => new Date()),
    DocumentURL: string().url().nullable(),
  });

  useEffect(() => {
    async function fetchClientData() {
      try {
        const clientData = await getFormClients();
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchClientData();

    return () => {
      setClients([]);
    };
  }, []);

  const projectData = {
    ProjectName: ProjectName,
    ClientId: ClientId,
    Description: Description,
    StartDate: StartDate,
    EndDate: EndDate,
    Budget: Budget,
    ProjectStatusId: 1,
    DocumentURL: DocumentURL,
    Deleted: false,
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await projectSchema.validate(projectData, { abortEarly: false });
      await postProject(projectData);
      toast.success("Project has been added");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error("Error adding Project");
      }
      console.error("Error adding Project :", error);
    }
  };

  return (
    <>
    <div className="TaskModal">
      {open && <div className="overlay" onClick={onClose}></div>}
      
      <dialog id="modal" open={open} onClose={onClose} className="modal">
        <div className="modal-title">Add Project</div>
        <br></br>
        <div className="form-container">
          <form className="modal-form">
            <label>Project Name :</label>
            <input
              type="text"
              value={ProjectName}
              onChange={(event) => setProjectName(event.target.value)}
            />

            <label>Client :</label>
            <select onChange={(event) => setClientId(event.target.value)}>
              <option value="">Select a Client</option>
              {clients.map((client) => (
                <option key={client.clientId} value={client.clientId}>
                  {client.clientName}
                </option>
              ))}
            </select>

            <label>Description : </label>
            <input
              type="text"
              value={Description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <label>Budget :</label>
            <input
              type="number"
              value={Budget}
              onChange={(event) => setBudget(event.target.value)}
            />

            <label>Start Date :</label>
            <input
              type="date"
              value={StartDate}
              onChange={(event) => setStartDate(event.target.value)}
            />

            <label>End Date : </label>
            <input
              type="date"
              value={EndDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
            <label>Document URL : </label>
            <input
              type="text"
              value={DocumentURL}
              onChange={(event) => setDocumentURL(event.target.value)}
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

export default ProjectModal;
