import React, { useState } from "react";
import { Client } from "../../../models/workPlan/Client";
import { postClient } from "../../../services/workPlan/ClientServices";
import { object, string, date } from "yup";
import "../../../styles/workPlan/Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ClientModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const [ClientName, setClientName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [TelephoneNo, setTelephoneNo] = useState("");

  const clientSchema = object({
    ClientName: string().required("Client Name is required"),
    Email: string().email("Invalid Email format"),
    Address: string().nullable(),
    TelephoneNo: string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .nullable(),
    CreatedDate: date().default(() => new Date()),
  });

  const clientData = {
    ClientName: ClientName,
    TelephoneNo: TelephoneNo,
    Address: Address,
    Email: Email,
    Deleted: false,
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await clientSchema.validate(clientData, { abortEarly: false });
      await postClient(clientData);
      toast.success("Client has been added");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error("Error adding Client");
      }
      console.error("Error adding Client:", error);
    }
  };

  return (
    <> 
    <div className="TaskModal">
      {open && <div className="overlay" onClick={onClose}></div>}
     
      <dialog id="modal" open={open} onClose={onClose} className="modal">
        <div className="modal-title">Add Client</div>
        <br></br>
        <div className="form-container">
          <form className="modal-form">
            <label>Client Name :</label>
            <input
              type="text"
              value={ClientName}
              onChange={(event) => setClientName(event.target.value)}
            />
            <label>Email : </label>
            <input
              type="text"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label>Address :</label>
            <input
              type="text"
              value={Address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <label>Telephone No :</label>
            <input
              type="text"
              value={TelephoneNo}
              onChange={(event) => setTelephoneNo(event.target.value)}
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

export default ClientModal;
