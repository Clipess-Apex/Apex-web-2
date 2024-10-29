import Header from "../../shared/Header";
import SideBar from "../../shared/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="layout">
    <Header />
    <div className="container">
      <SideBar />
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
