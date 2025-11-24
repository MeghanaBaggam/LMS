import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet,useNavigate } from "react-router-dom";
import { Tasks} from "../Config/Tasks";
import Permissions from "../Config/Permissions";

export const HRDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role=user?.role;
  const allowedTabs=Permissions[role]||[];
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="hr-container">
      <div className="top-right-menu">
        <div className="user-info" onClick={() => setShowMenu(!showMenu)}>
          <div className="avatar-circle">
            <FaUserCircle />
          </div>
          <span className="user-name">{user?.name}</span>

          {showMenu && (
            <div className="dropdown-box">
              <p onClick={() => setShowProfile(true)}>Profile</p>
              <p className="logout" onClick={logoutUser}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {showProfile && (
        <div className="model">
          <div className="model-content">
            <h3>User Profile</h3>
            <p>
              <strong>ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
            <p>
              <strong>Manager ID:</strong> {user?.manager_id || "-"}
            </p>
            <button onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}

      <h2 className="welcome-text">Welcome {role?.toUpperCase()} {user?.name}!</h2>

      <div className="top-nav">
       {Tasks.map((tab)=>{
        const isAllowed =allowedTabs.includes(tab.path);
        return(
          <NavLink
          key={tab.path}
          to={isAllowed ?tab.path:""}
          className={
            isAllowed ? ({isActive})=>(isActive ? "nav-item active-tab":"nav-item"):"nav-item disabled-tab"
          }>
            {tab.label}
          </NavLink>
        );
       })}
       
      </div>
        <Outlet />
    </div>
  );
};

export default HRDashboard;
