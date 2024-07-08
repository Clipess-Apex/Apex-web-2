import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import '../../../styles/timeEntry/EmployeeRecords/EmployeeMonthlyCalendar.css'
import EmployeeMonthlyRecord from './EmployeeMonthlyRecord';
import calendarIcon from '../../../icons/timeEntry/CalendarIcon.svg'
import {TimeEntryCalendar  } from '../common/CalendarStyledComponents'



const EmployeeMonthlyCalendar = () => {

    const [year, setYear] = useState<string | undefined>();
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleYearClick = (date: Date) => {
        const selectedYear = date.getFullYear().toString();
        setOpenCalendar(false);
        setYear(selectedYear);
    };

    const handleClick = () => {
        setOpenCalendar((prev) => !prev);
    };

    const yearString = year ? year : 'Select a Year';

    return (
        <>
            <div className="EmpMonthlyCal">
                <div className="textContainer" onClick={handleClick}>
                    {yearString}
                    <img src={calendarIcon} alt="Calendar" style={{ marginRight: '8px' }} />
                </div>

                {openCalendar && (
                    <TimeEntryCalendar >
                    <Calendar
                        view='decade'
                        className='yearRange'
                        onClickYear={handleYearClick}
                    />
                    </TimeEntryCalendar >  
                )}
            </div>
            <EmployeeMonthlyRecord yearProp={year} />
        </>
    )
}

export default EmployeeMonthlyCalendar