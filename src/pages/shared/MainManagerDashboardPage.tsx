import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'
import '../../styles/DashboardLayout/DashboardLayout.css'
import MainManagerDashboard from './MainManagerDashboard'

const MainManagerDashboardPage = () => {
  return (
    <>
    <div className="mainDashboard">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
            <MainManagerDashboard />
        </div>
      </div>
    </div>
  </>
  )
}

export default MainManagerDashboardPage