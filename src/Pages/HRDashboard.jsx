import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import tabs from "../Config/Tabs";

export const HRDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

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

      <h2 className="welcome-text">
        Welcome {role?.toUpperCase()} {user?.name}!
      </h2>

      <div className="top-nav">
        {tabs.map((tab) => {
          const canAccess = tab.permission.includes(user?.role);
          return (
            <NavLink
              key={tab.path}
              to={canAccess ? `/dashboard/${tab.path}` : "#"}
              className={({ isActive }) =>
                !canAccess
                  ? "nav-item disabled-tab"
                  : isActive
                  ? "nav-item active-tab"
                  : "nav-item"
              }
              onClick={(e) => {
                if (!canAccess) {
                  e.preventDefault();
                }
              }}
            >
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
