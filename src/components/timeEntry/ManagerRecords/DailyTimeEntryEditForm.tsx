import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { parse, format } from 'date-fns';
import * as Yup from 'yup';
import '../../../styles/timeEntry/ManagerRecords/DailyTimeEntryEditForm.css'
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';

interface DailyTimeEntry {
  dailyTimeEntryId: string;
  employeeId: string;
  date: string;
  checkIn: string;
  lunchIn: string;
  lunchOut: string;
  checkOut: string;
}

interface EditingDailyTimeEntry extends DailyTimeEntry {
  firstName?: string;
  lastName?: string;
}

interface DailyTimeEntryEditFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  editingDailyTimeEntry: EditingDailyTimeEntry | undefined;
  fetchDailyTimeEntries: () => void;
}

const DailyTimeEntryEditForm: React.FC<DailyTimeEntryEditFormProps> = ({ onSubmit, onCancel, editingDailyTimeEntry, fetchDailyTimeEntries }) => {

  const [dailyTimeEntry, setDailyTimeEntry] = useState<DailyTimeEntry>({
    dailyTimeEntryId: '',
    employeeId: '',
    date: '',
    checkIn: '',
    lunchIn: '',
    lunchOut: '',
    checkOut: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editingDailyTimeEntry) {
      setDailyTimeEntry({
        dailyTimeEntryId: editingDailyTimeEntry.dailyTimeEntryId,
        employeeId: editingDailyTimeEntry.employeeId,
        date: editingDailyTimeEntry.date,
        checkIn: convertTo24HourFormat(editingDailyTimeEntry.checkIn),
        lunchIn: convertTo24HourFormat(editingDailyTimeEntry.lunchIn),
        lunchOut: convertTo24HourFormat(editingDailyTimeEntry.lunchOut),
        checkOut: convertTo24HourFormat(editingDailyTimeEntry.checkOut),
      })
    }
  }, [editingDailyTimeEntry])


  const timeValidationSchema = Yup.object({
    checkIn: Yup.string()
      .required("Check In is required")
      .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)'),
    lunchIn: Yup.string()
      .required("Lunch In is required")
      .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)')
      .test('is-greater', 'Lunch In should be after Check In', function (value) {
        const { checkIn } = this.parent;
        return !checkIn || !value || checkIn < value;
      }),
    lunchOut: Yup.string()
      .required("Lunch Out is required")
      .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)')
      .test('is-greater', 'Lunch Out should be after Lunch In', function (value) {
        const { lunchIn } = this.parent;
        return !lunchIn || !value || lunchIn < value;
      }),
    checkOut: Yup.string()
      .required("Check Out is required")
      .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)')
      .test('is-greater', 'Check Out should be after Lunch Out', function (value) {
        const { lunchOut } = this.parent;
        return !lunchOut || !value || lunchOut < value;
      }),
  })

  const convertTo24HourFormat = (time: string): string => {
    if (time) {
      const parsedTime = parse(time, 'hh:mm a', new Date());
      return format(parsedTime, 'HH:mm');
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDailyTimeEntry({ ...dailyTimeEntry, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formatTime = (date: string, time: string) => {
      if (time) {
        const parsedDate = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
        return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
      }
      return null;
    };

    const formattedDailyTimeEntry = {
      ...dailyTimeEntry,
      date: editingDailyTimeEntry?.date || '',
      checkIn: formatTime(dailyTimeEntry.date, dailyTimeEntry.checkIn),
      lunchIn: formatTime(dailyTimeEntry.date, dailyTimeEntry.lunchIn),
      lunchOut: formatTime(dailyTimeEntry.date, dailyTimeEntry.lunchOut),
      checkOut: formatTime(dailyTimeEntry.date, dailyTimeEntry.checkOut),
    };
    try {
      await timeValidationSchema.validate(dailyTimeEntry, { abortEarly: false });
      setErrors({});
      const response = await axios.put('https://localhost:7166/api/TimeEntry/UpdateDailyTimeEntriesByManager', formattedDailyTimeEntry);
      console.log('Received data is', response.data);
      setDailyTimeEntry({
        dailyTimeEntryId: '',
        employeeId: '',
        date: '',
        checkIn: '',
        lunchIn: '',
        lunchOut: '',
        checkOut: ''
      });
      onSubmit();
      fetchDailyTimeEntries();
    } catch (error) {
      const newError: { [key: string]: string } = {};
      console.log('Error Found', error);
      toast.error(`Error Occoured - ${error}`)

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            newError[err.path] = err.message;
          }
        });
      }
      fetchDailyTimeEntries();
      setErrors(newError);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="DailyTimeEntryForm-overlay">
        <div className="DailyTimeEntryForm-mainContainer">
          <form className="DailyTimeEntryForm-formContainer" onSubmit={handleSubmit}>

            <label className='DailyTimeEntryForm-label' htmlFor="name">Employee Name</label>
            < input type='text' id='name' name='name'
              className='DailyTimeEntryForm-inputs'
              value={editingDailyTimeEntry?.firstName ? `${editingDailyTimeEntry.firstName} ${editingDailyTimeEntry.lastName}` : 'Name not Found'}
              onChange={handleChange} disabled />

            <label className='DailyTimeEntryForm-label' htmlFor="date">Working Date</label>
            < input type='date' id='date' name='date' className='DailyTimeEntryForm-inputs' value={dailyTimeEntry.date} onChange={handleChange} disabled />

            <label className='DailyTimeEntryForm-label' htmlFor="checkIn">Check In</label>
            < input type='time' id='checkIn' name='checkIn' className='DailyTimeEntryForm-inputs' value={dailyTimeEntry.checkIn} onChange={handleChange} />
            {errors.checkIn && <div className='DailyTimeEntryForm-timeError'>{errors.checkIn}</div>}


            <label className='DailyTimeEntryForm-label' htmlFor="lunhIn">Lunch In</label>
            < input type='time' id='lunchIn' name='lunchIn' className='DailyTimeEntryForm-inputs' value={dailyTimeEntry.lunchIn} onChange={handleChange} />
            {errors.lunchIn && <div className='DailyTimeEntryForm-timeError'>{errors.lunchIn}</div>}


            <label className='DailyTimeEntryForm-label' htmlFor="lunchOut">Lunch Out</label>
            < input type='time' id='lunchOut' name='lunchOut' className='DailyTimeEntryForm-inputs' value={dailyTimeEntry.lunchOut} onChange={handleChange} />
            {errors.lunchOut && <div className='DailyTimeEntryForm-timeError'>{errors.lunchOut}</div>}


            <label className='DailyTimeEntryForm-label' htmlFor="checkOut">Check Out</label>
            < input type='time' id='checkOut' name='checkOut' className='DailyTimeEntryForm-inputs' value={dailyTimeEntry.checkOut} onChange={handleChange} />
            {errors.checkOut && <div className='DailyTimeEntryForm-timeError'>{errors.checkOut}</div>}

            <div className="DailyTimeEntryForm-ButtonContainer">
              <button className="DailyTimeEntryForm-cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
              <button className="DailyTimeEntryForm-submit-btn" type="submit">Update</button>
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
  )
}

export default DailyTimeEntryEditForm