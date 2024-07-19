
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { StyleContextProvider } from './providers/StyleContextProvider';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { HelmetProvider } from 'react-helmet-async';
import '@fortawesome/fontawesome-free/css/all.css';

import InventoryManagerLayout from './pages/inventory/layoutPage/InventoryManagerLayout';
import EmployeePageLayout from './pages/inventory/layoutPage/EmployeePageLayout';
import InventoryTypeManagerLayout from './pages/inventory/layoutPage/InventoryTypeManagerLayout'
import RequestManagerLayout from './pages/inventory/layoutPage/RequestManagerLayout'
import InventoryDashboard from './pages/inventory/layoutPage/InventoryDashboardLayout'
import InventoryAssignLayout from './pages/inventory/layoutPage/InventoryAssignLayout'
import EmployeeRequestLayout from './pages/inventory/layoutPage/EmployeeRequestLayout';
import EmployeeInventoryDashboard from './pages/inventory/layoutPage/EmployeeInventoryDashboardLayout'

import LeaveManagerPage from './pages/leavePages/LeaveLayoutPages/ManagerLeaveDashboardLayout';
import HandleLeaves from './pages/leavePages/LeaveLayoutPages/LeaveHandleLayout';
import CompanyLeaveHistory from './pages/leavePages/LeaveLayoutPages/CompanyLeaveHistoryLayout';
import LeaveSettingDashboard from './pages/leavePages/LeaveLayoutPages/LeaveSettingsLayout';
import LeaveReportGenerate from './pages/leavePages/LeaveLayoutPages/LeaveReportGenerationLayout';
import CreateLeaves from './pages/leavePages/LeaveLayoutPages/LeaveCreateLayout';
import LeaveTypeForm from './components/leaveComponents/LeaveSettingComponents/LeaveTypeForm';
import EmployeeLeaveHistory from './pages/leavePages/LeaveLayoutPages/EmployeeLeaveHistoryLayout';
import RemainingLeaves from './pages/leavePages/LeaveLayoutPages/RemainingLeaveLayout';
import PendingLeaves from './pages/leavePages/LeaveLayoutPages/PendingLeaveLayout';
import LeaveEmployeePage from './pages/leavePages/LeaveLayoutPages/EmployeeLeaveDashboard'
import './App.css';

import EmployeeAttendanceEntryPage from './pages/timeEntry/EmployeeAttendanceEntryPage';
import EmployeeRecordsPage from './pages/timeEntry/EmployeeRecordsPage';
import ManagerRecordsPage from './pages/timeEntry/ManagerRecordsPage';
import ManagerDateAssignmentPage from './pages/timeEntry/ManagerDateAssignmentPage';
import EmployeeDashBoardPage from './pages/timeEntry/EmployeeDashBoardPage';
import ManagerDashBoardPage from './pages/timeEntry/ManagerDashBoardPage';

import EmployeeTablePage from './pages/adminModule/adminPages/EmployeeTablePage';
import AddEmployeeFormPage from './pages/adminModule/adminPages/AddEmployeeFormPage';
import EmployeeDetailsPage from './pages/adminModule/adminPages/EmployeeDetailsPage';
import AdminDashboardPage from './pages/adminModule/adminPages/AdminDashboardPage';
import LoginForm from './pages/adminModule/login/LoginForm';
import ManagerDashboard from './pages/adminModule/ManagerDashboard';
import EmployeeDashboard from './pages/adminModule/EmployeeDashboard';
import RoleTablePage from './pages/adminModule/adminPages/RoleTablePage';
import EmployeeTypeTablePage from './pages/adminModule/adminPages/EmployeeTypeTablePage';
import DepartmentTablePage from './pages/adminModule/adminPages/DepartmentTablePage';
import UserProfilePage from './pages/adminModule/adminPages/UserProfilePage';
import PasswordResetRequest from './pages/adminModule/login/PasswordResetRequest';
import ResetPassword from './pages/adminModule/login/ResetPassword';
import ChangePassword from './pages/adminModule/login/ChangePassword';

import ManagerViewCorrectPage from "./pages/workPlan/Pages/ManagerViewCorrectPage";
import ManagerTaskViewCorrectPage from "./pages/workPlan/Pages/ManagerTaskViewCorrectPage";
import ManagerProjectViewCorrectPage from "./pages/workPlan/Pages/ManagerProjectViewCorrectPage";
import ManagerClientViewCorrectPage from "./pages/workPlan/Pages/ManagerClientViewCorrectPage";
import ManagerTeamViewCorrectPage from "./pages/workPlan/Pages/ManagerTeamViewCorrectPage";
import EmployeeWorkCalendarViewCorrectPage from "./pages/workPlan/Pages/EmployeeWorkCalendarViewCorrectPage";
import EmployeeToDoViewCorrectPage from "./pages/workPlan/Pages/EmployeeToDoViewCorrectPage ";
import EmployeeTaskViewCorrectPage from "./pages/workPlan/Pages/EmployeeTaskViewCorrectPage";
import EmployeeViewCorrectPage from "./pages/workPlan/Pages/EmployeeViewCorrectPage"; 
import EmployeeProjectViewCorrectPage from "./pages/workPlan/Pages/EmployeeProjectViewCorrectPage";

import PrimaryEmployeeDashboardPage from './pages/shared/MainEmployeeDashboardPage';
import PrimaryManagerDashboardPage from './pages/shared/MainManagerDashboardPage';
import { ToastContainer } from 'react-toastify';



const AppRoutes = () => {
   const employeeId = 4;

  let routes = useRoutes([
    { path: "/timeEntry/employee/markAttendance", element: <EmployeeAttendanceEntryPage/> }, 
    { path: "/timeEntry/employee/employeeRecords", element: <EmployeeRecordsPage/> },
    { path: "/timeEntry/manager/markAttendance", element: <EmployeeAttendanceEntryPage/> }, 
    { path: "/timeEntry/manager/employeeRecords", element: <EmployeeRecordsPage/> },
    { path: "/timeEntry/manager/managerRecords", element: <ManagerRecordsPage/> }, 
    { path: "/timeEntry/manager/managerDateAssignment", element: <ManagerDateAssignmentPage/> }, 
    { path: "/timeEntry/employee", element: <EmployeeDashBoardPage/> }, 
    { path: "/timeEntry/manager", element: <ManagerDashBoardPage/> },

    { path: "/leave/manager" ,element: <LeaveManagerPage /> },
    { path: '/leave/manager/manage-leave', element: <HandleLeaves/> },
    { path: '/leave/manager/company-leave-history', element: <CompanyLeaveHistory/> },
    { path: "/leave/manager/leave-settings" ,element: <LeaveSettingDashboard />},
    { path: '/leave/manager/report-generation', element: <LeaveReportGenerate/> },
    { path: '/leave/manager/leave-request', element: <CreateLeaves/> },
    { path: "/create-leave-type", element: <LeaveTypeForm /> },
    { path: "/edit-leave-type/:id", element: <LeaveTypeForm /> },
    { path: "/leave/manager/leave-history", element: <EmployeeLeaveHistory/> },
    { path: '/leave/manager/remaining-leaves', element: <RemainingLeaves/> },
    { path: '/leave/employee' , element:<LeaveEmployeePage/> },
    { path: '/leave/employee/leave-request' , element:<CreateLeaves/> },
    { path: '/leave/employee/leave-history' , element:<EmployeeLeaveHistory/> },
    { path: '/leave/employee/remaining-leaves' , element:<RemainingLeaves/> },
    { path: '/leave/pending-leaves' , element:<PendingLeaves/> },
    { path: '/leave/employee/pending-leaves' , element:<PendingLeaves/> },
    
    { path: "/inventory/manager", element: <InventoryDashboard/> },
    { path: "/inventory/employee", element: <EmployeeInventoryDashboard/> },
    {path:"/inventory/employee/employeeinventory",element:<EmployeePageLayout/>},
    {path:"/inventory/employee/inventoryrequest",element:<EmployeeRequestLayout/>},
    {path:"/inventory/manager/employeeinventory",element:<EmployeePageLayout/>},
    {path:"/inventory/manager/inventoryrequest",element:<EmployeeRequestLayout/>},
    { path: "/inventory/manager/inventory", element:<InventoryManagerLayout/>}, 
    {path:"/inventory/manager/inventorytype",element:<InventoryTypeManagerLayout/>},
    {path:"/inventory/manager/inventoryrequestManager",element:<RequestManagerLayout/>},
    { path: "/inventory/manager/inventoryAssign", element: <InventoryAssignLayout /> },
    

    { path: '/', element: <LoginForm />},
    { path: '/password-reset-request', element: <PasswordResetRequest /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/admin-dashboard', element: <AdminDashboardPage /> },
    { path: '/change-password', element: <ChangePassword /> },
    { path: '/user-profile/:id', element: <UserProfilePage /> },
    { path: '/employeeTable', element: <EmployeeTablePage /> },
    { path: '/employeeTable/employeeDetails/:id', element: <EmployeeDetailsPage /> },
    { path: '/employeeTable/add-employee', element: <AddEmployeeFormPage /> },
    { path: '/departmentTable', element: <DepartmentTablePage /> },
    { path: '/roleTable', element: <RoleTablePage /> },
    { path: '/employeeTypeTable', element: <EmployeeTypeTablePage /> },
    { path: '/manager', element: <ManagerDashboard /> },
    { path: '/employee', element: <EmployeeDashboard /> },

    { path: "/workplan/manager", element: <ManagerViewCorrectPage /> },
    { path: "/workplan/employee", element: <EmployeeViewCorrectPage /> },
    { path: "/workplan/employee/employeeWorkCalendar", element: <EmployeeWorkCalendarViewCorrectPage />},
    { path: "/workplan/employee/employeeProjects", element: <EmployeeProjectViewCorrectPage /> },
    { path: "/workplan/employee/employeeToDo", element: <EmployeeToDoViewCorrectPage /> },
    { path: "/workplan/employee/employeeTasks", element: <EmployeeTaskViewCorrectPage /> },
    { path: "/workplan/manager/managerTasks", element: <ManagerTaskViewCorrectPage /> },
    { path: "/workplan/manager/managerProjects", element: <ManagerProjectViewCorrectPage /> },
    { path: "/workplan/manager/managerClients", element: <ManagerClientViewCorrectPage /> },
    { path: "/workplan/manager/managerTeams", element: <ManagerTeamViewCorrectPage /> },
    { path: "/workplan/manager/employeeWorkCalendar", element: <EmployeeWorkCalendarViewCorrectPage />},
    { path: "/workplan/manager/employeeProjects", element: <EmployeeProjectViewCorrectPage /> },
    { path: "/workplan/manager/employeeToDo", element: <EmployeeToDoViewCorrectPage /> },
    { path: "/workplan/manager/employeeTasks", element: <EmployeeTaskViewCorrectPage /> },

    { path: "/primary-ManagerDashboardPage", element: <PrimaryManagerDashboardPage /> },
    { path: "/primary-EmployeeDashboardPage", element: <PrimaryEmployeeDashboardPage /> },

  ]);
  return routes;
};


const App: React.FC = () => {
  return (
    <StyleContextProvider>
      <ToastContainer/>
      <BrowserRouter>
        <AuthContextProvider>
          <HelmetProvider>
            <AppRoutes />
          </HelmetProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </StyleContextProvider>
  );
}; 

export default App;
