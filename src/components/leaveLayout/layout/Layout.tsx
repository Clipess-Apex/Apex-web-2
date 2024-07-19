import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import SideBar from '../NavBar/SideBar';
import "./Layout.css";
import { LayoutProps } from '../../../models/LeaveComponentsModels';

// Use the props in the component
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">
        <SideBar />
        <div className="mainContainer">
          {children}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
