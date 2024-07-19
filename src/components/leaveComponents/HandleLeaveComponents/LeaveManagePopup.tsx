import React from 'react';
import './LeaveManagePopup.css';

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    window.location.reload();
  };
  return (
    <div className="leave-manage-popup-overlay">
      <div className="leave-manage-popup-box">
        <p className="leave-manage-popup-message">{message}</p>
        <div className="leave-manage-popup-buttons">
          <button className="leave-manage-popup-button confirm" onClick={handleConfirm}>Confirm</button>
          <button className="leave-manage-popup-button cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
