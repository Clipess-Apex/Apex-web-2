import React, { useState } from 'react';
import { DateRangePicker, defaultStaticRanges, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import '../../../styles/timeEntry/EmployeeRecords/EmployeeDailyCalendar.css'
import EmployeeDailyRecords from './EmployeeDailyRecords';
import calendarIcon from '../../../icons/timeEntry/CalendarIcon.svg'
import {
  endOfDay,
  startOfYear,
  endOfYear,
  addYears,
  isSameDay,
} from 'date-fns';

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

const EmployeeDailyCalendar: React.FC = () => {

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  });

  const [openDate, setOpenDate] = useState(false);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate && endDate && (startDate !== endDate)) {
      setDateRange(ranges.selection as DateRange);
      setOpenDate(false);
    } else {
      setDateRange(ranges.selection as DateRange);
    }
  };

  const startDateProp = dateRange.startDate ? format(dateRange.startDate, 'yyyy-MM-dd') : '';
  const endDateProp = dateRange.endDate ? format(dateRange.endDate, 'yyyy-MM-dd') : '';

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <>
      <div className="EmpDailyCal-main-container">

        <div className="textContainer" onClick={handleClick}>
          {dateRange.startDate && dateRange.endDate ? (
            `${startDateProp} to ${endDateProp}`
          ) : (
            'Select a date Range'
          )}
          <img src={calendarIcon} alt="Calendar" style={{ marginRight: '8px' }} />
        </div>

        {openDate && (
          <DateRangePicker
            className="dateRange"
            ranges={[dateRange]}
            onChange={handleSelect}
            staticRanges={[
              ...defaultStaticRanges,
              {
                label: "This Year",
                range: () => ({
                  startDate: startOfYear(new Date()),
                  endDate: endOfDay(new Date())
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                  );
                }
              },
              {
                label: "Last Year",
                range: () => ({
                  startDate: startOfYear(addYears(new Date(), -1)),
                  endDate: endOfYear(addYears(new Date(), -1))
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                  );
                }
              }
            ]}
            rangeColors={["#00A7A7"]}
          />
        )}
      </div>

      <EmployeeDailyRecords startDateProp={startDateProp} endDateProp={endDateProp} />

    </>
  )
}

export default EmployeeDailyCalendar