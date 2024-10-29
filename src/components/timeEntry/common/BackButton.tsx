import React from 'react'
import '../../../styles/timeEntry/common/BackButton.css'
import { Link } from 'react-router-dom'

interface BackButtonProps {
  path: string
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
  return (
    <>
      <Link to={path} style={{ textDecoration: "none" }}>
        <div className="backButton">
          <p>Back to DashBoard</p>
        </div>
      </Link>
    </>
  )
}

export default BackButton