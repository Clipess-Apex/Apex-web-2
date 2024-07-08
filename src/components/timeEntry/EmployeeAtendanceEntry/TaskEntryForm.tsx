import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import '../../../styles/timeEntry/EmployeeAttendanceEntry/TaskEntryForm.css'
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';


interface TaskData {
  timeEntryId: number;
  employeeId: number;
  duration: string;
  description: string;
}

interface TaskEntryFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  getTimeEntries: () => void;
  TaskFormtypeId: number | undefined;
  employeeId: number;
  currentTaskData?: TaskData | undefined;
}

interface EmployeeData {
  employeeID: number;
  timeEntryTypeId: number | undefined;
  duration: string;
  description: string;
}

const TaskEntryForm: React.FC<TaskEntryFormProps> = ({ onSubmit, onCancel, getTimeEntries, TaskFormtypeId, employeeId, currentTaskData }) => {

  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    employeeID: employeeId,
    timeEntryTypeId: TaskFormtypeId,
    duration: '',
    description: '',
  });

  useEffect(() => {
    if (currentTaskData) {
      setEmployeeData({
        employeeID: employeeId,
        timeEntryTypeId: TaskFormtypeId,
        duration: currentTaskData.duration,
        description: currentTaskData.description,
      });
    }
  }, [currentTaskData]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const taskValidationSchema = Yup.object({
    employeeID: Yup.number().required("Employee Id is required").typeError("EmployeeID must be a number"),
    duration: Yup.number().typeError("Duration must be a number").required("Duration is required").integer("Duration must be an integer"),
    description: Yup.string().required("Description is required"),
    timeEntryTypeId: Yup.number().required().test('is-timeEntryTypeId-valid', 'Invalid timeEntryTypeId', value => value === 5)
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await taskValidationSchema.validate(employeeData, { abortEarly: false });
      setErrors({});
      if (currentTaskData) {
        // Update task
        const response = await axios.put(`https://localhost:7166/api/TimeEntry/UpdateTimeEntryTasksByEmployee?id=${currentTaskData.timeEntryId}&duration=${employeeData.duration}&description=${employeeData.description}`);
      } else {
        // Add task
        const response = await axios.post('https://localhost:7166/api/TimeEntry/CreateTimeEntriesByEmployee', employeeData);
      }

      setEmployeeData({
        employeeID: employeeId,
        duration: '',
        description: '',
        timeEntryTypeId: TaskFormtypeId, // Keep time entry after submission
      });
      onSubmit();
      getTimeEntries();
    } catch (error) {
      const newError: { [key: string]: string } = {};
      console.log(employeeData);
      console.log("Error Found", error);
      toast.error(`Error Occoured - ${error}`)

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            newError[err.path] = err.message;
          }
        });
      }
      setErrors(newError);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="TaskEntryForm-overlay">
        <div className="TaskEntryForm-mainContainer">
          <form onSubmit={handleSubmit}>

            <h2 className="TaskEntryForm-heading"> Enter Task Details </h2>
            <label className="TaskEntryForm-label" htmlFor="duration"> Duration </label>
            <input
              className="TaskEntryForm-input"
              type="text"
              id="duration"
              name="duration"
              placeholder="Enter Duration in Minutes"
              value={employeeData.duration}
              onChange={handleChange}
            />
            {errors.duration && (<div className="TaskEntryForm-taskError">{errors.duration}</div>)}
            <br />

            <label className="TaskEntryForm-label" htmlFor="description"> Description </label>
            <textarea
              className="TaskEntryForm-input"
              id="description"
              name="description"
              value={employeeData.description}
              onChange={handleChange}
            />
            {errors.description && (<div className="TaskEntryForm-taskError">{errors.description}</div>)}
            <br />

            <div className="TaskEntryForm-button-container">
              <button type="button" className="TaskEntryForm-cancel-btn" onClick={handleCancel}> Cancel </button>
              <button type="submit" className="TaskEntryForm-submit-btn">{currentTaskData ? "Update" : "Submit"} </button>
            </div>
          </form>
        </div>
      </div>

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

export default TaskEntryForm