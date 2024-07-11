import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import ReactPaginate from "react-paginate";
import '../../../styles/timeEntry/common/Paginate.css'
import '../../../styles/timeEntry/EmployeeRecords/EmployeeDropdownContainer.css'
import '../../../styles/timeEntry/EmployeeRecords/EmployeeMonthlyRecord.css'
import BackButton from '../common/BackButton';

import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../providers/AuthContextProvider';


interface MonthlyTimeEntry {
  employeeId: string;
  month: string;
  allocatedDuration: number;
  completedDuration?: number;
  firstName?: string;
  lastName?: string;
}

interface EmployeeMonthlyRecordpROPS {
  yearProp: string | undefined;
}

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const EmployeeMonthlyRecord: React.FC<EmployeeMonthlyRecordpROPS> = ({ yearProp }) => {

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

  const Employee = useRef<StoredUser | null>(null); // Ref for storing user data


  const [monthlyData, setMonthlyData] = useState<MonthlyTimeEntry[]>([]);
  const [year, setYear] = useState<string | undefined>(yearProp);
  const [employeeId, setEmployeeId] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [pageCount, setPageCount] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("Completed");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [sortingValue, setSortingValue] = useState<number>(1);
  const currentPageRef = useRef<number>(currentPage);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      Employee.current = parsedUser
      setEmployeeId(Employee.current.EmployeeID)
    }
  },[])

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setYear(yearProp);
  }, [yearProp]);

  useEffect(() => {
    if (year) {
      setCurrentPage(1);
      currentPageRef.current = 1;
      setForcePage(0);
      fetchTotalMonthlyTimeEntryCount();
      fetchMonthlyTimeEntries();
    }
  }, [year]);

  useEffect(() => {
    if (currentPage) {
      fetchMonthlyTimeEntries();
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

  const fetchMonthlyTimeEntries = async () => {
    try {
      const response =
        await fetch(`https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntriesByEmployee?employeeId=${employeeId}&year=${year}
          &sortBy=${sortBy}&isAscending=${isAscending}&pageNumber=${currentPageRef.current}&pageSize=${pageItems}`);
      if (response.ok) {
        console.log("Data received successfully:");
        const jsonData = await response.json();
        setMonthlyData(jsonData);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalMonthlyTimeEntryCount = async () => {
    try {
      const response3 = await fetch(
        `https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntriesByEmployee?employeeId=${employeeId}&year=${year}`
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

  const handlePageClick = (selected: { selected: number }) => {
    const selectedPage = selected.selected + 1;
    setForcePage(undefined);
    setCurrentPage(selectedPage);
  };

  const handlePageItemsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setPageItems(selectedValue);
    setCurrentPage(1);
    setForcePage(0);
  };

  const calculatePageCount = () => {
    if (totalCount) {
      const noOfPages = Math.ceil(totalCount / pageItems);
      setPageCount(noOfPages);
    }
  };

  const handleSortingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (value === 1) {
      setSortBy("Completed");
      setIsAscending(false);
    } else if (value === 2) {
      setSortBy("Completed");
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

  return (
    <>
      <div className="Employee-dropdown-container">
        <div className="Employee-NoItems-container">
          <span>Items per Page</span>
          <select value={pageItems} onChange={handlePageItemsChange} className="aa">
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
            <option value={1}>Completed Duration - Max to Min</option>
            <option value={2}>Completed Duration - Min to Max</option>
          </select>
        </div>
      </div>

      <div className="EmpMonthlyRecord-data-container">
        <div className="EmpMonthlyRecord-header-container">
          <div
            className="EmpMonthlyRecord-header">
            <div className="wrapper">
              <div className="data" >Name</div>
              <div className="data" >Month</div>
              <div className="data" >Allocated Duration</div>
              <div className="data" >Completed Duration</div>
            </div>
          </div>
        </div>
        <div className="EmpMonthlyRecord-card-container">
          {monthlyData.map((item, index) => (
            <div className="EmpMonthlyRecord-card" key={index}>
              <ul>
                <li>
                  <div className="wrapper">
                    <div className="data"> {item.firstName ? item.firstName + " " + item.lastName : item.employeeId} </div>
                    <div className="data"> {item.month ? item.month : "---"} </div>
                    <div className="data"> {item.allocatedDuration ? convertMinutesToHours(item.allocatedDuration) : "---"} </div>
                    <div className="data"> {item.completedDuration ? convertMinutesToHours(item.completedDuration) : "---"}</div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="Employee-Paginate-container">
        <BackButton path={normalizedUserRole === 'manager' ? "/timeEntry/manager" : "/timeEntry/employee"} />
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

export default EmployeeMonthlyRecord