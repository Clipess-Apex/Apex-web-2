import React, { useState, useEffect } from 'react';
import './HandlePendingLeaves.css';
import rejectIcon from '../../../icons/leaves/thumb-down-Leave.svg';
import approveIcon from '../../../icons/leaves/thumb-up-svgrepo-com.svg';
import ConfirmationPopup from './LeaveManagePopup'

interface Leave {
  leaveId: number;
  employeeId: number;
  leaveDate: Date;
  leaveType: {
    leaveTypeName: string;
  };
  employee?: {
    firstName: string;
    lastName: string;
  };
  reason: string;
}

interface HandleLeaveProps {
  eName: string;
  type: string;
  date: Date;
  reason: string;
  onApprove: () => void;
  onReject: () => void;
}

const LeavePage: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupConfirmAction, setPopupConfirmAction] = useState<() => void>(() => {});

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch('https://localhost:7166/api/leave/leave?statusId=1');
        if (!response.ok) {
          throw new Error('Failed to fetch leaves');
        }
        const data: Leave[] = await response.json();

        const leavesWithDateConverted: Leave[] = data.map(item => ({
          ...item,
          leaveDate: new Date(item.leaveDate)
        }));

        setLeaves(leavesWithDateConverted);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        setError('Error fetching leaves');
      }
    };

    fetchLeaves();
  }, []);

  const handlePopupConfirm = () => {
    popupConfirmAction();
    setShowPopup(false);
  };

  const handleApprove = (id: number, employeeName: string) => {
    setPopupMessage(`Are you sure you want to approve the leave request for  ${employeeName}?`);
    setPopupConfirmAction(() => () => approveLeave(id, employeeName));
    setShowPopup(true);
  };

  const handleReject = (id: number, employeeName: string) => {
    setPopupMessage(`Are you sure you want to reject the leave request for  ${employeeName}?`);
    setPopupConfirmAction(() => () => rejectLeave(id, employeeName));
    setShowPopup(true);
  };

  const approveLeave = async (id: number, employeeName: string) => {
    try {
      const response = await fetch(`https://localhost:7166/api/leave/updateLeave/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(2), // Status ID 2 for approval
      });
      if (response.ok) {
        console.log('Leave approved successfully:', id);
        setLeaves(leaves.filter(leave => leave.leaveId !== id));
      } else {
        console.error('Failed to approve leave:', response.statusText);
        setError('Failed to approve leave');
      }
    } catch (error) {
      console.error('Error approving leave:', error);
      setError('Error approving leave');
    }
  };

  const rejectLeave = async (id: number, employeeName: string) => {
    try {
      const response = await fetch(`https://localhost:7166/api/leave/updateLeave/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(3), // Status ID 3 for rejection
      });
      if (response.ok) {
        console.log('Leave rejected successfully:', id);
        setLeaves(leaves.filter(leave => leave.leaveId !== id));
      } else {
        console.error('Failed to reject leave:', response.statusText);
        setError('Failed to reject leave');
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
      setError('Error rejecting leave');
    }
  };

  return (
    <div className="leave-manage-page">
      <h1 className="leave-manage-page-title">Manage Leave Requests</h1>
      <div className="leave-manage-page-cardsContainer">
        {leaves.map((leave) => (
          <HandleLeave
            key={leave.leaveId}
            eName={`${leave.employee?.firstName || 'N/A'} ${leave.employee?.lastName || 'N/A'}`}
            date={leave.leaveDate}
            type={leave.leaveType.leaveTypeName}
            reason={leave.reason}
            onApprove={() => handleApprove(leave.leaveId, `${leave.employee?.firstName || 'N/A'} ${leave.employee?.lastName || 'N/A'}`)}
            onReject={() => handleReject(leave.leaveId, `${leave.employee?.firstName || 'N/A'} ${leave.employee?.lastName || 'N/A'}`)}
          />
        ))}
      </div>
      {error && <p className="leave-manage-page-error">{error}</p>}
      {showPopup && (
        <ConfirmationPopup
          message={popupMessage}
          onConfirm={handlePopupConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

const HandleLeave: React.FC<HandleLeaveProps> = ({ eName, type, date, reason, onApprove, onReject }) => {
  return (
    <div className="leave-manage-page-leaveSection">
      <div className="leave-manage-page-leaveDetails">
        <p className="leave-manage-page-label">Name:</p>
        <p className="leave-manage-page-value">{eName}</p>
      </div>
      <div className="leave-manage-page-leaveDetails">
        <p className="leave-manage-page-label">Leave Type:</p>
        <p className="leave-manage-page-value">{type}</p>
      </div>
      <div className="leave-manage-page-leaveDetails">
        <p className="leave-manage-page-label">Leave Date:</p>
        <p className="leave-manage-page-value">{date.toLocaleDateString()}</p>
      </div>
      <div className="leave-manage-page-leaveDetails">
        <p className="leave-manage-page-label">Reason:</p>
        <p className="leave-manage-page-value">{reason}</p>
      </div>
      <div className="leave-manage-page-buttons">
        <button className="leave-manage-page-button reject" onClick={onReject}>
          Reject <img src={rejectIcon} alt="Reject Icon" className="leave-manage-page-button-icon" />
        </button>
        <button className="leave-manage-page-button approve" onClick={onApprove}>
          Approve <img src={approveIcon} alt="Approve Icon" className="leave-manage-page-button-icon" />
        </button>
      </div>
    </div>
  );
};

export default LeavePage;
