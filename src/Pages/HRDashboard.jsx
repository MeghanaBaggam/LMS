import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { NavLink,Outlet } from 'react-router-dom';
export const HRDashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
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
                            <p className="logout" onClick={logoutUser}>Logout</p>
                        </div>
                    )}
                </div>
            </div>

            {showProfile && (
                <div className="model">
                    <div className="model-content">
                        <h3>User Profile</h3>
                        <p><strong>ID:</strong> {user?.id}</p>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Role:</strong> {user?.role}</p>
                        <p><strong>Manager ID:</strong> {user?.manager_id || "-"}</p>
                        <button onClick={() => setShowProfile(false)}>Close</button>
                    </div>
                </div>
            )}

            <h2 className="welcome-text">Welcome HR {user?.name}!</h2>

            <div className="top-nav">

                {[
                    { path: "leave-balance", label: "Leave Balance" },
                    { path: "leave-requests", label: "Leave Requests" },
                    { path: "team-details", label: "Team Details" },
                    { path: "team-leave-requests", label: "Team Leave Requests" },
                    { path: "manage-employees", label: "Manage Employees" },
                    { path: "employee-leave-requests", label: "Employee Leave Requests" },
                ].map(tab => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({isActive})=>
                            isActive ? "nav-item active-tab" :"nav-item"
                        }
                      
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </div>
            <div style={{marginTop:"20px"}}>
                <Outlet/>
            </div>
           
        </div>
    );
};

export default HRDashboard;
