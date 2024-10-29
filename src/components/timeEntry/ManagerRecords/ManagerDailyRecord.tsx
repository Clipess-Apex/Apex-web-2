import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../styles/timeEntry/common/Paginate.css'
import '../../../styles/timeEntry/ManagerRecords/ManagerDropdownContainer.css'
import '../../../styles/timeEntry/ManagerRecords/ManagerDailyRecord.css'
import DailyTimeEntryEditForm from './DailyTimeEntryEditForm';
import editIcon from '../../../icons/timeEntry/EditIcon.svg'
import expandIcon from '../../../icons/timeEntry/ExpandIcon.svg'
import BackButton from '../common/BackButton';


interface ManagerDailyRecordProps {
  startDateProp: string;
  endDateProp: string;
}

interface DailyTimeEntry {
  dailyTimeEntryId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  date: string;
  checkIn: string;
  lunchIn: string;
  lunchOut: string;
  checkOut: string;
  totalDuration: number;
}

interface Employee {
  employeeID: string;
  firstName: string;
  lastName: string;
}

interface ExpandedDetail {
  description: string;
  duration: number;
  createdDate: string
}

const ManagerDailyRecord: React.FC<ManagerDailyRecordProps> = ({ startDateProp, endDateProp }) => {

  const [startDate, setStartDate] = useState<string>(startDateProp);
  const [endDate, setEndDate] = useState<string>(endDateProp);
  const [dailyTimeEntries, setDailyTimeEntries] = useState<DailyTimeEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<ExpandedDetail[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [pageCount, setPageCount] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>('Date');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [sortingValue, setSortingValue] = useState<number>(1);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined);
  const currentPageRef = useRef<number>(currentPage);
  const [DailyTimeEntryRecord, setDailyTimeEntryRecord] = useState<DailyTimeEntry | undefined>(undefined);
  const [showDailyTimeEntryForm, setShowDailyTimeEntryForm] = useState<boolean>(false);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setStartDate(startDateProp);
    setEndDate(endDateProp);
  }, [startDateProp, endDateProp]);

  useEffect(() => {
    fetchEmployeesByManager();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchTotalDailyTimeEntryCount();
      currentPageRef.current = 1;
      fetchDailyTimeEntries();
      setCurrentPage(1);
      setForcePage(0);
      setClickedIndex(null);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (currentPage) {
      fetchDailyTimeEntries();
      setClickedIndex(null);
    }
  }, [currentPage, pageItems, sortBy, isAscending]);

  useEffect(() => {
    if (totalCount) {
      calculatePageCount();
    }
    if (totalCount === 0) {
      setForcePage(0);
      setPageCount(1);
      setCurrentPage(1);
    }
  }, [totalCount, pageItems]);

  useEffect(() => {
    fetchTotalDailyTimeEntryCount();
    fetchDailyTimeEntries();
  }, [selectedEmployee]);

  const fetchEmployeesByManager = async () => {
    try {
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetEmployeesByManager`);
      if (response.ok) {
        console.log('Data received successfully:');
        const jsonData = await response.json();
        setEmployeeData(jsonData);
        console.log("Employees are", jsonData);
      } else {
        console.log("Failed to fetch dailyTimeEntries");
      }
    } catch (error) {
      console.error('Error fetching dailyTimeEntries:', error);
    }
  };

  const fetchDailyTimeEntries = async () => {
    try {
      const idParam = selectedEmployee ? `&id=${selectedEmployee}` : '';
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetDailyTimeEntriesByManager?startDate=${startDate}&endDate=${endDate}${idParam}&sortBy=${sortBy}&isAscending=${isAscending}&pageNumber=${currentPageRef.current}&pageSize=${pageItems}`);
      if (response.ok) {
        console.log('Data received successfully:');
        const jsonData = await response.json();
        console.log("Fetched dailyTimeEntries is", jsonData);
        setDailyTimeEntries(jsonData);
      } else {
        console.log("Failed to fetch dailyTimeEntries");
      }
    } catch (error) {
      console.error('Error fetching dailyTimeEntries:', error);
    }
  };

  const fetchTotalDailyTimeEntryCount = async () => {
    try {
      const idParam = selectedEmployee ? `&id=${selectedEmployee}` : '';
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetDailyTimeEntriesByManager?startDate=${startDate}&endDate=${endDate}${idParam}`);
      if (response.ok) {
        console.log("Total count received successfully");
        const jsonData = await response.json();
        setTotalCount(jsonData.length);
      } else {
        console.log("Failed to fetch total count");
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  useEffect(() => {
    if (expandedId !== null && expandedDate !== null) {
      fetchExpandedData();
    }
  }, [expandedId, expandedDate]);

  const fetchExpandedData = async () => {
    try {
      console.log("Expanded sample");
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetTimeEntryTasks?id=${expandedId}&startDate=${expandedDate}&endDate=${expandedDate}`);
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Expanded data are", jsonData);
        setExpandedDetails(jsonData);
        console.log('Expanded Data received successfully:');
      } else {
        console.error('Failed to fetch Expanded dailyTimeEntries:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Expanded dailyTimeEntries:', error);
    }
  };

  const handleExpandClick = (employeeId: string, date: string, index: number) => {
    if (expandedId === employeeId && expandedDate === date) {
      setExpandedId(null);
      setExpandedDate(null);
      setClickedIndex(null);
    } else {
      setExpandedId(employeeId);
      setExpandedDate(date);
      setClickedIndex(index);
    }
  };

  const handlePageClick = (selected: { selected: number }) => {
    const selectedPage = selected.selected + 1;
    setForcePage(undefined);
    setCurrentPage(selectedPage);
    setClickedIndex(null);
  };

  const handlePageItemsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setPageItems(selectedValue);
    setCurrentPage(1);
    setForcePage(0);
    setClickedIndex(null);
  };

  const calculatePageCount = () => {
    const noOfPages = Math.ceil(totalCount! / pageItems);
    setPageCount(noOfPages);
  };

  const handleSortingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (value === 1) {
      setSortBy('Date');
      setIsAscending(true);
    } else if (value === 2) {
      setSortBy('Date');
      setIsAscending(false);
    } else if (value === 3) {
      setSortBy('Duration');
      setIsAscending(false);
    } else if (value === 4) {
      setSortBy('Duration');
      setIsAscending(true);
    }
    setSortingValue(value);
    setCurrentPage(1);
    setForcePage(0);
    setClickedIndex(null);
  };

  const handleFilteringChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All Employees") {
      setSelectedEmployee(undefined);
    } else {
      setSelectedEmployee(selectedValue);
    }
    setClickedIndex(null);
    setCurrentPage(1);
    setForcePage(0);
  };

  const handleClickDailyTimeEntryForm = (dailyTimeEntry: DailyTimeEntry) => {
    setDailyTimeEntryRecord(dailyTimeEntry)
    setShowDailyTimeEntryForm(true)
  }

  const handleSubmitDailyTimeEntryForm = () => {
    setClickedIndex(null);
    setDailyTimeEntryRecord(undefined);
    setShowDailyTimeEntryForm(false);
  }

  const handleCancelDailyTimeEntryForm = () => {
    setClickedIndex(null);
    setDailyTimeEntryRecord(undefined);
    setShowDailyTimeEntryForm(false);
  }

  const convertMinutesToHours = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} Hour(s) ${minutes} Minute(s)`;
  };


  const convertMinutesToHoursExpand = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    }
    else {
      return `${minutes} minutes`;
    }
  };

  return (
    <>

      <div className="Manager-dropdown-container">

        <div className="Manager-NoofItems-container">
          <span>Items Per page</span>
          <select value={pageItems} onChange={handlePageItemsChange} className='aa'>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="Manager-sorting-container">
          <span>Sort Records</span>
          <select value={sortingValue} onChange={handleSortingChange}>
            <option value={1}>By Date - Oldest</option>
            <option value={2}>By Date - Newest</option>
            <option value={3}>By Duration - High to Low</option>
            <option value={4}>By Duration - Low to High</option>
          </select>
        </div>

        <div className="Manager-filtering-container">
          <span>Filter Records</span>
          <select id="usersDropdown" value={selectedEmployee || ''} onChange={handleFilteringChange} >
            <option value="">All Employees</option>
            {employeeData.map((user) => (
              <option key={user.employeeID} value={user.employeeID}>
                {user.firstName}  {" "}  {user.lastName}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="MagDailyRecord-data-container">
        <div className="MagDailyRecord-header-container">
          <div className="MagDailyRecord-header" >
            <div className="wrapper">
              <div className="data" >Expand</div>
              <div className="data" >Name</div>
              <div className="data" >Date</div>
              <div className="data" >Check-In</div>
              <div className="data" >Lunch In</div>
              <div className="data" >Lunch Out</div>
              <div className="data" >Check-Out</div>
              <div className="data" >Total Duration</div>
              <div className="data" >Edit</div>
            </div>
          </div>
        </div>
        <div className="MagDailyRecord--card-container ">
          {dailyTimeEntries.map((item, index) => (
            <div className={`MagDailyRecord-card  ${clickedIndex === index ? 'expanding' : ''}`} key={index} >
              <ul>
                <li>
                  <div className="wrapper">
                    <div className="data">
                      <div className="editButton" onClick={() => handleExpandClick(item.employeeId, item.date, index)}>
                        <img src={expandIcon}
                          className={`expand-icon ${clickedIndex === index ? 'rotate' : ''}`}
                        />
                      </div>
                    </div>
                    <div className="data"> {item.firstName ? item.firstName + ' ' + item.lastName : item.employeeId} </div>
                    <div className="data"> {item.date ? item.date : "---"} </div>
                    <div className="data"> {item.checkIn ? item.checkIn : "---"} </div>
                    <div className="data"> {item.lunchIn ? item.lunchIn : "---"} </div>
                    <div className="data"> {item.lunchOut ? item.lunchOut : "---"} </div>
                    <div className="data"> {item.checkOut ? item.checkOut : "---"} </div>
                    <div className="data"> {item.totalDuration ? convertMinutesToHours(item.totalDuration) : "---"} </div>
                    <div className="data">  <div className="editButton" onClick={() => handleClickDailyTimeEntryForm(item)}> <img src={editIcon}></img> </div> </div>

                  </div>
                </li>

                {clickedIndex === index &&
                  <div className="MagDailyRecord-expandCardContainer">
                    {expandedDetails.length > 0 ?
                      expandedDetails.map((detail, index) => (
                        <div className="MagDailyRecord-expandedCard" key={index}>
                          <li>
                            <div className="wrapper">
                              <div className="data Item2">{detail.createdDate} </div>
                              <div className="data Item1">{detail.description}</div>
                              <div className="data Item2">{detail.duration ?  convertMinutesToHoursExpand(detail.duration) : ''}</div>


                            </div>
                          </li>

                        </div>
                      )) : <div className="MagDailyRecord-expandedCard">
                        <div className="wrapper">
                          <div className="data">No Data Available to show</div>
                        </div>
                      </div>}
                  </div>}
              </ul>
            </div>
          ))}

        </div>

      </div>

      {showDailyTimeEntryForm &&
        <DailyTimeEntryEditForm
          onSubmit={handleSubmitDailyTimeEntryForm}
          onCancel={handleCancelDailyTimeEntryForm}
          editingDailyTimeEntry={DailyTimeEntryRecord}
          fetchDailyTimeEntries={fetchDailyTimeEntries}
        />}

      <div className="Manager-Paginate-container">
        <BackButton path={"/timeEntry/manager"} />
        <ReactPaginate
          breakLabel=". . ."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          forcePage={forcePage}

          className="react-paginate"

        />
      </div>

    </>
  )
}

export default ManagerDailyRecord