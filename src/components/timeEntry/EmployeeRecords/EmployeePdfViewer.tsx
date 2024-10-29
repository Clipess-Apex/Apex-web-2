import React, { useState, useEffect,useRef } from 'react'
import '../../../styles/timeEntry/EmployeeRecords/EmployeePdfViewer.css'
import BackButton from '../common/BackButton';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { themePlugin } from '@react-pdf-viewer/theme';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';


import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../providers/AuthContextProvider';

interface MonthlyTimeEntry {
  monthlyTimeEntryId: number;
  employeeId: number;
  allocatedDuration: number;
  completedDuration: number;
  attendancePdfUrl: string;
}

interface EmployeePdfViewerProps {
  monthProp: string | undefined;
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

const EmployeePdfViewer: React.FC<EmployeePdfViewerProps> = ({ monthProp }) => {

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

  const [employeeId, setEmployeeId] = useState<number>();
  const [month, setMonth] = useState<string | undefined>();
  const [monthlyTimeEntry, setMonthlyTimeEntry] = useState<MonthlyTimeEntry | undefined>(undefined);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const getFilePluginInstance = getFilePlugin();
  const themePluginInstance = themePlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      Employee.current = parsedUser
      setEmployeeId(Employee.current.EmployeeID)
    }
  },[])

  useEffect(() => {
    setMonth(monthProp);
  }, [monthProp]);

  useEffect(() => {
    fetchMonthlyPdfByEmployee();
  }, [month]);

  const fetchMonthlyPdfByEmployee = async () => {
    try {
      const response = await fetch(`https://localhost:7166/api/pdfGeneration/GetMonthlyPdfByEmployee?employeeId=${employeeId}&month=${month}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('PDF data fetched successfully', data);
        setMonthlyTimeEntry(data[0]);
      } else {
        console.log('Failed to fetch PDF data');
      }
    } catch (error) {
      console.error('Error fetching PDF data:', error);
    }
  };

  return (
    <>
      <div className="PdfViewer-mainConatiner">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {monthlyTimeEntry && monthlyTimeEntry.attendancePdfUrl ? (
            <div className="pdfViewer">
              <Viewer
                fileUrl={monthlyTimeEntry.attendancePdfUrl}
                plugins={[
                  defaultLayoutPluginInstance,
                  fullScreenPluginInstance,
                  getFilePluginInstance,
                  themePluginInstance,
                  pageNavigationPluginInstance
                ]}
                theme={'dark'}
                defaultScale={1.2}
              />
            </div>
          ) : (
            <div className='PdfNotAvailable'>
              No PDF Available
            </div>
          )}
        </Worker>
      </div>

      <div className="PdfViewer-backButtonContainer">
        <BackButton path={normalizedUserRole === 'manager' ? "/timeEntry/manager" : "/timeEntry/employee"} />
      </div>
    </>
  )
}

export default EmployeePdfViewer