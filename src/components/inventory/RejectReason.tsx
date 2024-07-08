import React, { useState, FormEvent, ChangeEvent } from 'react';
import '../../styles/inventory/RejectReason.css';
import axios from 'axios';

import AdvancedButton from './AdvancedButton';

interface Props {
    handleClose: () => void;
    RejectId: number;
    Reason: string;
    Message: string;
    Inventory: string;
    buttonDisable: () => void;
}

const RejectReason: React.FC<Props> = ({ handleClose, RejectId, Reason, Inventory, Message, buttonDisable }) => {
    const [reason, setReason] = useState<string>(Reason); // Initialize with passed Reason prop
    const [reasonValidationError, setReasonValidationError] = useState<string>('');
    const [disabledSubmitButton, setdisabledSubmitButton] = useState<boolean>(true);

    const validateReason = (value: string): string => {
        if (!value.trim()) {
            return "* This field cannot be empty";
        } else if (value.trim().length > 150) { // Corrected the length condition
            return "* Reason must be less than 150 characters";
        }
        return "";
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setReason(value);
        const validationError = validateReason(value);
        setReasonValidationError(validationError);
        console.log(validationError)
        setdisabledSubmitButton(!!validationError); // Disable the button if there's a validation error
        console.log(!!validationError)
    };

    const handleRejectState = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        const validationError = validateReason(reason);
        setReasonValidationError(validationError);

        if (validationError) {
            setdisabledSubmitButton(true);
            return;
        }

        try {
            if (RejectId) {
                const res = await axios.put(`https://localhost:7166/api/Request/reject/${RejectId}`, {
                    Rejected: true,
                    Isread: true,
                    Inventory: Inventory,
                    Message: Message,
                    Reason: reason // Use the updated reason state
                });

                console.log(res);
                console.log("Update successful");
                if (res.status === 200) {
                    handleClose(); // Close the popup on successful update
                    buttonDisable();
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="popup-rejectReason">
            <div className="popup-inner-rejectReason">
                <form onSubmit={handleRejectState}>
                    <h3 className='rejectReason-heading'>Why?</h3>
                    <div className='reason-rejectReason'>
                        
                            <textarea
                                id="message"
                                name="message"
                                value={reason}
                                onChange={handleChange}
                                rows={4}
                                cols={40}
                                placeholder="Enter your reason here"
                            />
                        
                    </div>
                    <div style={{height:"40px",position:"relative",top:"10px"}}>
                    <label className='rejectReason-Error'>{reasonValidationError}</label>
                    </div>
                    <div className="button-submit-rejectReason">
                        <AdvancedButton type="submit" width="120px" height="50px" disabled={disabledSubmitButton}>Reject</AdvancedButton>
                    </div>
                    <div className="button-close-rejectReason">
                        <AdvancedButton type="button" width="120px" height="50px" onClick={handleClose}>Cancel</AdvancedButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RejectReason;
