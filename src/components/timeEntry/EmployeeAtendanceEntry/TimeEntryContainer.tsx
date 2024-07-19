import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useDrop } from 'react-dnd';
import { format } from 'date-fns';
import TaskEntryForm from './TaskEntryForm';
import TimeEntryCard from './TimeEntryCard';
import TimeEntryTypeButton from './TimeEntryTypeButton';
import '../../../styles/timeEntry/EmployeeAttendanceEntry/TimeEntryContainer.css'
import PlusIcon from '../../../icons/timeEntry/PlusIcon.svg'
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../common/BackButton';

import { useAuth } from "../../../providers/AuthContextProvider";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}


interface TimeEntryType {
  id: number;
  typeId: number;
  timeEntryName: string;
  description: string
}

interface TimeEntry {
  id: number;
  timeEntryId: number;
  employeeId: number;
  timeEntryTypeId: number;
  duration: string;
  description: string;
  createdDate: string;
}

interface TaskData {
  timeEntryId: number;
  employeeId: number;
  duration: string;
  description: string;
}

interface DragItem {
  id: number;
  timeEntryTypeId: number;
}

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const TimeEntryContainer = () => {

  const { token } = useAuth();
  const { logout } = useAuth();

let decodedToken: DecodedToken | null = null;

if (token) {
  decodedToken = jwtDecode<DecodedToken>(token);
  console.log("Decoded token inside sideBar:", decodedToken);
}


const userRole = decodedToken
? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
: null;



const normalizedUserRole = userRole?.toLowerCase();

const Employee = useRef<StoredUser | null>(null);

  const [droppedTimeEntryEventIDs, setDroppedTimeEntryEventIDs] = useState<number[]>([]);
  const droppedTimeEntryEventIDsRef = useRef(droppedTimeEntryEventIDs);
  const [showTaskEntryPopup, setShowTaskEntryPopup] = useState(false);
  const [employeeID, setEmployeeId] = useState<number>();
  const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [timeEntryTypes, setTimeEntryTypes] = useState<TimeEntryType[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [TaskFormtypeId, setTaskFormtypeId] = useState<number | undefined>(undefined);
  const [currentTaskData, setCurrentTaskData] = useState<TaskData | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      Employee.current = parsedUser
      setEmployeeId(Employee.current.EmployeeID)
    }
  },[])

  useEffect(() => {
    getTimeEntryTypes();
    getTimeEntries();
    setCurrentTaskData(undefined);
  }, []);

  useEffect(() => {
  }, [currentTaskData]);

  useEffect(() => {
    droppedTimeEntryEventIDsRef.current = droppedTimeEntryEventIDs;
  }, [droppedTimeEntryEventIDs]);

  const getTimeEntryTypes = async () => {
    try {
      const response = await fetch('https://localhost:7166/api/TimeEntry/GetTimeEntryTypesByEmployee');
      if (response.ok) {
        const jsonData: TimeEntryType[] = await response.json();
        setTimeEntryTypes(jsonData);
      } else {
        toast.error("Failed to fetch timeEntryTypes ")
      }
    } catch (error) {
      toast.error(`Error Occoured whle fetching TimeEntry Types - ${error}`)
    }
  };

  const getTimeEntries = async () => {
    try {
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetTimeEntriesByEmployee?id=${employeeID}&date=${today}`);
      if (response.ok) {
        const jsonData: TimeEntry[] = await response.json();
        setTimeEntries(jsonData);

        const entryIds = jsonData.map((entry) => entry.timeEntryTypeId);
        setDroppedTimeEntryEventIDs(entryIds);
      } else {
        console.log("Failed to fetch ");
      }
    } catch (error) {
      toast.error(`Error Occoured whle fetching TimeEntry - ${error}`)
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'div',
    drop: async (item: DragItem) => {
      const { id, timeEntryTypeId } = item;
      if (!isActionAllowed(timeEntryTypeId)) {
        return;
      }
      if (!droppedTimeEntryEventIDsRef.current.includes(timeEntryTypeId)) {
        try {
          await axios.post('https://localhost:7166/api/TimeEntry/CreateTimeEntriesByEmployee', {
            employeeID,
            timeEntryTypeId,
          });
          toast.success("Successfull")
          getTimeEntries();
        } catch (error) {
          toast.error(`Error Occoured  - ${error}`)
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const isActionAllowed = (id: number) => {
    switch (id) {
      case 2: // Lunch-In
        if (!droppedTimeEntryEventIDsRef.current.includes(1)) {
          toast.warn("Please drop Check-In first")
          return false;
        }
        return true;
      case 3: // Lunch-Out
        if (!droppedTimeEntryEventIDsRef.current.includes(1) || !droppedTimeEntryEventIDsRef.current.includes(2)) {
          toast.warn("Please drop Lunch-In first");
          return false;
        }
        return true;
      case 4: // Check-Out
        if (!droppedTimeEntryEventIDsRef.current.includes(1) || !droppedTimeEntryEventIDsRef.current.includes(2) || !droppedTimeEntryEventIDsRef.current.includes(3)) {
          toast.warn("Please drop Lunch-Out first");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleTaskEntryFormClick = () => {
    if (!isAddTaskAllowed()) {
      return
    }
    setShowTaskEntryPopup(true);
    const taskType = timeEntryTypes[4]; // Assuming the task entry type is the 5th item in the list
    if (taskType) {
      setTaskFormtypeId(taskType.typeId);
    }
  };

  const isAddTaskAllowed = () => {
    if (!droppedTimeEntryEventIDsRef.current.includes(1)) {
      toast.warn("Please add Check In Before Add Task")
      return false
    }
    else if (droppedTimeEntryEventIDsRef.current.includes(1) && droppedTimeEntryEventIDsRef.current.includes(2) &&
      !droppedTimeEntryEventIDsRef.current.includes(3) && !droppedTimeEntryEventIDsRef.current.includes(4)) {
      toast.warn("Please add Lunch Out Before Add Task")
      return false
    }
    else if (droppedTimeEntryEventIDsRef.current.includes(4)) {
      toast.warn("Please Remove Check Out before add Task")
      return false
    }
    return true;
  }

  const handleTaskEntryFormSubmit = () => {
    setShowTaskEntryPopup(false);
    setCurrentTaskData(undefined);
  };

  const handleTaskEntryFormCancel = () => {
    setShowTaskEntryPopup(false);
    setCurrentTaskData(undefined);
  };

  const handleTaskDeleteClick = async (taskId: number) => {
    console.log("TaskId is", taskId);
    try {
      const response = await fetch(`https://localhost:7166/api/TimeEntry/DeleteTimeEntryTasksByEmployee?id=${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success("Task Delete Successfully")
        getTimeEntries();
      } else {
        const errorData = await response.json();
        toast.error(`Action Failed-  ${errorData.message}`)
      }
    } catch (error) {
      toast.error(`Error Occoured - ${error}`)
    }
  };

  const handleEventDeleteClick = async (timeEntryId: number, employeeId: number, timeEntryTypeId: number, createdDate: string) => {
    if (!isDeleteAllowed(timeEntryTypeId)) {
      return;
    }
    try {
      const response = await fetch(`https://localhost:7166/api/TimeEntry/DeleteTimeEntryEventsByEmployee?timeEntryId=${timeEntryId}&employeeId=${employeeId}&date=${createdDate}&typeId=${timeEntryTypeId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Time entry event deleted successfully');
        toast.success("Event Delete Successfully")
        getTimeEntries(); // Refresh the time entries after deletion
      } else {
        const errorData = await response.json();
        toast.error(`Action Failed-  ${errorData.message}`)
      }
    } catch (error) {
      toast.error(`Error Occoured - ${error}`)
    }
  };

  const isDeleteAllowed = (id: number) => {
    switch (id) {
      case 1: // Lunch-In
        if (droppedTimeEntryEventIDsRef.current.includes(2) || droppedTimeEntryEventIDsRef.current.includes(3) || droppedTimeEntryEventIDsRef.current.includes(4)) {
          toast.warn("Please Remove Lunch In First")
          return false;
        } else {
          return true;
        }
      case 2: // Lunch-Out
        if (droppedTimeEntryEventIDsRef.current.includes(3) || droppedTimeEntryEventIDsRef.current.includes(4)) {
          toast.warn("Please Remove Lunch-Out first")
          return false;
        } else {
          return true;
        }
      case 3: // Check-Out
        if (droppedTimeEntryEventIDsRef.current.includes(4)) {
          toast.warn("Please Remove Check-Out first")
          return false;
        } else {
          return true;
        }
      default:
        return true;
    }
  };

  const handleTaskUpdateClick = (task: TaskData) => {
    setCurrentTaskData(task);
    setShowTaskEntryPopup(true);
    const taskType = timeEntryTypes[4]; // Assuming the task entry type is the 5th item in the list
    if (taskType) {
      setTaskFormtypeId(taskType.typeId);
    }
  };

  return (
    <>
      <div className="taskAddContainer">
        <div className="taskAddButton" onClick={handleTaskEntryFormClick}>
          <p> Click to add Tasks</p>
          <img src={PlusIcon} />
        </div>
      </div>

      <div className="attendance-mainContainer">
        <div className="attendance-Left-subContainer">
          {timeEntryTypes.slice(0, 4).map((type) => (
            <TimeEntryTypeButton
              key={type.id}
              id={type.typeId}
              text={type.timeEntryName}
              canDrag={!droppedTimeEntryEventIDs.includes(type.typeId)}
              timeEntryTypeId={type.typeId}
            />
          ))}
        </div>

        <div
          className="attendance-Right-subContainer div3"
          ref={drop}
          style={{ backgroundColor: isOver ? "lightgray" : "white" }}
        >
          {timeEntries.map((entry) => {
            const entryType = timeEntryTypes.find((type) => type.typeId === entry.timeEntryTypeId);
            const entryText = entry.timeEntryTypeId === 5 ? entry.description : (entryType ? entryType.timeEntryName : "Not found");
            const formattedCreatedTime = new Date(entry.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            return entry.timeEntryTypeId === 5 ? (
              <TimeEntryCard
                key={entry.id}
                id={entry.timeEntryTypeId}
                text={entryText}
                canDrag={false}
                onTaskUpdateClick={() => handleTaskUpdateClick(entry)}
                onTaskDeleteClick={() => handleTaskDeleteClick(entry.timeEntryId)}
                createdTime={formattedCreatedTime}
                duration={entry.duration}
                className='timeEntryTaskButton'
              />
            ) : (
              <TimeEntryCard
                key={entry.id}
                id={entry.timeEntryTypeId}
                text={entryText}
                canDrag={false}
                onEventDeleteClick={() => handleEventDeleteClick(entry.timeEntryId, entry.employeeId,
                  entry.timeEntryTypeId, entry.createdDate)}
                createdTime={formattedCreatedTime}
                className='timeEntryEventButton'
              />
            );
          })}
        </div>
      </div>

      <div className="attendance-backButton-container">
        <BackButton path={normalizedUserRole === 'manager' ? "/timeEntry/manager" : "/timeEntry/employee"} />
      </div>

      {showTaskEntryPopup && (
        <div className="PopuoForm">
          <TaskEntryForm
            onSubmit={handleTaskEntryFormSubmit}
            onCancel={handleTaskEntryFormCancel}
            getTimeEntries={getTimeEntries}
            TaskFormtypeId={TaskFormtypeId}
            employeeId={employeeID }
            currentTaskData={currentTaskData}
          />
        </div>
      )}
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce} />
    </>
  );
}

export default TimeEntryContainer