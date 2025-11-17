import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import ManageEmployees from '../Components/ManageEmployees';
import TeamDetails from '../Components/TeamDetails';
export const HRDashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [activeTab, setActiveTab] = useState("manage-employees");
    
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
                    { key: "leave-balance", label: "Leave Balance" },
                    { key: "leave-requests", label: "Leave Requests" },
                    { key: "team-details", label: "Team Details" },
                    { key: "team-leave-requests", label: "Team Leave Requests" },
                    { key: "manage-employees", label: "Manage Employees" },
                    { key: "employee-leave-requests", label: "Employee Leave Requests" },
                ].map(tab => (
                    <span
                        key={tab.key}
                        className={`nav-item ${activeTab === tab.key ? "active-tab" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
            {activeTab === "manage-employees" && (
                <ManageEmployees/>
            )}
            {activeTab==="team-details" && (
                <TeamDetails/>
            )
            }
        </div>
    );
};

export default HRDashboard;
