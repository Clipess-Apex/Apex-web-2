import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ReactPaginate from "react-paginate";
import '../../../styles/timeEntry/common/Paginate.css'
import '../../../styles/timeEntry/ManagerRecords/ManagerMonthlyRecord.css'
import '../../../styles/timeEntry/ManagerRecords/ManagerDropdownContainer.css'
import BackButton from '../common/BackButton';


interface MonthlyTimeEntry {
  employeeId: string;
  month: string;
  allocatedDuration: number;
  completedDuration?: number;
  firstName?: string;
  lastName?: string;
}

interface EmployeeData {
  employeeID: string;
  firstName: string;
  lastName: string;
}

interface ManagerMonthlyRecordpROPS {
  monthProp: string | undefined;
}

const ManagerMonthlyRecord: React.FC<ManagerMonthlyRecordpROPS> = ({ monthProp }) => {

  const [monthlyData, setMonthlyData] = useState<MonthlyTimeEntry[]>([]);
  const [month, setMonth] = useState<string | undefined>(monthProp);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [pageCount, setPageCount] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("Completed");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [sortingValue, setSortingValue] = useState<number>(1);
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined);
  const currentPageRef = useRef<number>(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setMonth(monthProp);
  }, [monthProp]);

  useEffect(() => {
    fetchEmployeesByManager();
  }, []);

  useEffect(() => {
    if (month) {
      setCurrentPage(1);
      currentPageRef.current = 1;
      setForcePage(0);
      fetchTotalMonthlyTimeEntryCount();
      fetchMonthlyTimeEntries();
    }
  }, [month]);

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

  useEffect(() => {
    fetchTotalMonthlyTimeEntryCount();
    fetchMonthlyTimeEntries();
  }, [selectedEmployee]);

  const fetchMonthlyTimeEntries = async () => {
    try {
      const idParam = selectedEmployee ? `&id=${selectedEmployee}` : "";
      const response = await fetch(
        `https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntriesByManager?month=${month}${idParam}&sortBy=${sortBy}&isAscending=${isAscending}&pageNumber=${currentPageRef.current}&pageSize=${pageItems}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setMonthlyData(jsonData);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployeesByManager = async () => {
    try {
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetEmployeesByManager`);
      if (response.ok) {
        const jsonData = await response.json();
        setEmployeeData(jsonData);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalMonthlyTimeEntryCount = async () => {
    try {
      const idParam = selectedEmployee ? `&id=${selectedEmployee}` : "";
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntriesByManager?month=${month}${idParam}`);
      if (response.ok) {
        const jsonData = await response.json();
        setTotalCount(jsonData.length);
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

  const handleFilteringChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All Employees") {
      setSelectedEmployee(undefined);
    } else {
      setSelectedEmployee(selectedValue);
    }
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
      <div className="Manager-dropdown-container">
        <div className="Manager-NoofItems-container">
          <span>Items per Page</span>
          <select value={pageItems} onChange={handlePageItemsChange} className="aa">
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
            <option value={1}>Completed Duration - Max to Min</option>
            <option value={2}>Completed Duration - Min to Max</option>
          </select>
        </div>

        <div className="Manager-filtering-container">
          <span>Filter Records</span>
          <select id="usersDropdown" value={selectedEmployee || ""} onChange={handleFilteringChange}>
            <option value="">All Employees</option>
            {employeeData.map((user) => (
              <option key={user.employeeID} value={user.employeeID}> {user.firstName} {user.lastName} </option>
            ))}
          </select>
        </div>
      </div>

      <div className="MagMonthlyRecord-data-container">
        <div className="MagMonthlyRecord-header-container">
          <div
            className="MagMonthlyRecord-header">
            <div className="wrapper">
              <div className="data" >Name</div>
              <div className="data" >Month</div>
              <div className="data" >Allocated Duration</div>
              <div className="data" >Completed Duration</div>
            </div>
          </div>
        </div>
        <div className="MagMonthlyRecord-card-container">
          {monthlyData.map((item, index) => (
            <div className="MagMonthlyRecord-card" key={index}>
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

export default ManagerMonthlyRecord