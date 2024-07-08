import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../styles/timeEntry/common/Paginate.css'
import '../../../styles/timeEntry/EmployeeRecords/EmployeeDropdownContainer.css'
import '../../../styles/timeEntry/EmployeeRecords/EmployeeDailyRecords.css'
import expandIcon from '../../../icons/timeEntry/ExpandIcon.svg'
import BackButton from '../common/BackButton';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../providers/AuthContextProvider';

interface EmployeeDailyRecordsProps {
  startDateProp: string;
  endDateProp: string;
}

interface DataItem {
  employeeId: number;
  date: string;
  checkIn: string;
  lunchIn: string;
  lunchOut: string;
  checkOut: string;
  totalDuration: number;
  firstName: string;
  lastName: string;
}

interface ExpandedDetail {
  description: string;
  duration: number;
  createdDate: string;
}

interface DecodedToken{
  EmployeeID: number;
}

const EmployeeDailyRecords: React.FC<EmployeeDailyRecordsProps> = ({ startDateProp, endDateProp }) => {

  const { token } = useAuth();

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decodedToken);
  }

const tokenEmployeeID = decodedToken ? decodedToken.EmployeeID : undefined;

  const [startDate, setStartDate] = useState<string>(startDateProp);
  const [endDate, setEndDate] = useState<string>(endDateProp);
  const [employeeId, setEmployeeId] = useState<number | undefined>(tokenEmployeeID); // ID, Should use from Token
  const [data, setData] = useState<DataItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<ExpandedDetail[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [pageCount, setPageCount] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number | undefined>(undefined);
  const currentPageRef = useRef<number>(currentPage);
  const [sortBy, setSortBy] = useState<string>("Date");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [sortingValue, setSortingValue] = useState<number>(1);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setStartDate(startDateProp);
    setEndDate(endDateProp);
  }, [startDateProp, endDateProp]);

  useEffect(() => {
    if (startDate && endDate && employeeId) {
      setCurrentPage(1);
      currentPageRef.current = 1;
      fetchTotalDailyTimeEntryCount();
      fetchDailyTimeEntries();
      setForcePage(0);
    }
  }, [startDate, endDate, employeeId]);

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

  const fetchDailyTimeEntries = async () => {
    try {
      const response =
        await fetch(`https://localhost:7166/api/TimeEntry/GetDailyTimeEntriesByEmployee?id=${employeeId}&startDate=${startDate}
        &endDate=${endDate}&sortBy=${sortBy}&isAscending=${isAscending}&pageNumber=${currentPageRef.current}&pageSize=${pageItems}`);
      if (response.ok) {
        console.log("Data received successfully:");
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalDailyTimeEntryCount = async () => {
    try {
      const response3 = await fetch(
        `https://localhost:7166/api/TimeEntry/GetDailyTimeEntriesByEmployee?id=${employeeId}&startDate=${startDate}&endDate=${endDate}`
      );
      if (response3.ok) {
        console.log("Total count received successfully");
        const jsonData3 = await response3.json();
        setTotalCount(jsonData3.length);
      } else {
        console.log("Failed to fetch total count");
      }
    } catch (error) {
      console.error("Error fetching total count:", error);
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
      const response2 = await fetch(
        `https://localhost:7166/api/TimeEntry/GetTimeEntryTasks?id=${expandedId}&startDate=${expandedDate}&endDate=${expandedDate}`
      );
      if (response2.ok) {
        const jsonData2 = await response2.json();
        setExpandedDetails(jsonData2);
        console.log("Expanded Data received successfully:");
      } else {
        console.error("Failed to fetch Expanded data:", response2.statusText);
      }
    } catch (error) {
      console.error("Error fetching Expanded data:", error);
    }
  };

  const handleExpandClick = (employeeId: number, date: string, index: number) => {
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
    const selectedPage = selected.selected + 1; // 1 based pages
    setForcePage(undefined);
    setCurrentPage(selectedPage);
    setClickedIndex(null);
  };

  const handlePageItemsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (value === 1) {
      setSortBy("Date");
      setIsAscending(true);
    } else if (value === 2) {
      setSortBy("Date");
      setIsAscending(false);
    } else if (value === 3) {
      setSortBy("Duration");
      setIsAscending(false);
    } else if (value === 4) {
      setSortBy("Duration");
      setIsAscending(true);
    }
    setSortingValue(value);
    setCurrentPage(1);
    setForcePage(0);
  };

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
      <div className="Employee-dropdown-container">
        <div className="Employee-NoItems-container">
          <span>Items per page</span>
          <select value={pageItems} onChange={handlePageItemsChange}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="Employee-sorting-container">
          <span>Sort Records</span>
          <select value={sortingValue} onChange={handleSortingChange}>
            <option value={1}>By Date - Oldest</option>
            <option value={2}>By Date - Newest</option>
            <option value={3}>By Duration - High to Low</option>
            <option value={4}>By Duration - Low to High</option>
          </select>
        </div>
      </div>

      <div className="EmpDailyRecord-data-container">
        <div className="EmpDailyRecord-header-container">
          <div
            className="EmpDailyRecord-header">
            <div className="wrapper">
              <div className="data" >Expand</div>
              <div className="data" >Name</div>
              <div className="data" >Date</div>
              <div className="data" >Check-In</div>
              <div className="data" >Lunch In</div>
              <div className="data" >Lunch Out</div>
              <div className="data" >Check-Out</div>
              <div className="data" >Total Duration</div>
            </div>
          </div>
        </div>
        <div className="EmpDailyRecord-card-container">
          {data.map((item, index) => (
            <div className={`EmpDailyRecord-card ${clickedIndex === index ? 'expanding' : ''}`} key={index}  >
              <ul>
                <li>
                  <div className="wrapper">
                    <div className="data">
                      <div className="editButton" onClick={() => handleExpandClick(item.employeeId, item.date, index)}>
                        <img src={expandIcon}
                          className={`expand-icon ${clickedIndex === index ? 'rotate' : ''}`} />
                      </div>
                    </div>
                    <div className="data"> {item.firstName ? item.firstName + ' ' + item.lastName : item.employeeId}</div>
                    <div className="data"> {item.date ? item.date : "---"} </div>
                    <div className="data"> {item.checkIn ? item.checkIn : "---"}</div>
                    <div className="data"> {item.lunchIn ? item.lunchIn : "---"} </div>
                    <div className="data"> {item.lunchOut ? item.lunchOut : "---"}</div>
                    <div className="data">{item.checkOut ? item.checkOut : "---"}</div>
                    <div className="data">{item.totalDuration ? convertMinutesToHours(item.totalDuration) : "---"}</div>
                  </div>
                </li>

                {clickedIndex === index &&
                  <div className="EmpDailyRecord-expandCardContainer">
                    {expandedDetails.length > 0 ?
                      expandedDetails.map((detail, index) => (
                        <div className="EmpDailyRecord-expandedCard" key={index}>
                          <li>
                            <div className="wrapper">
                              <div className="data Item2">{detail.createdDate}</div>
                              <div className="data Item1">{detail.description}</div>
                              <div className="data Item2">{detail.duration ? convertMinutesToHoursExpand(detail.duration) : ''}</div>
                            </div>
                          </li>
                        </div>
                      )) : <div className="EmpDailyRecord-expandedCard">
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

      <div className="Employee-Paginate-container">
        <BackButton path={"/timeEntry/manager"} />
        <ReactPaginate
          breakLabel=". . ."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          forcePage={forcePage}
          className="react-paginate"
        />
      </div>

    </>
  );
}

export default EmployeeDailyRecords