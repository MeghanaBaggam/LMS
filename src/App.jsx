import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login.jsx";
import HRDashboard from "./Pages/HRDashboard";

import ManageEmployees from "./Components/ManageEmployees.jsx";
import TeamLeaveRequests from "./Components/TeamLeaveRequests.jsx";
import LeaveBalance from "./Components/LeaveBalance.jsx";
import LeaveRequests from "./Components/LeaveRequests.jsx";
import TeamDetails from "./Components/TeamDetails.jsx";
import EmployeeLeaveRequests from "./Components/EmployeeLeaveRequest.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<HRDashboard />}>
       <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="team-leave-requests" element={<TeamLeaveRequests />} />
        <Route path="leave-balance" element={<LeaveBalance />} />
        <Route path="leave-requests" element={<LeaveRequests />} />
        <Route path="team-details" element={<TeamDetails />} />
        <Route path="employee-leave-requests" element={<EmployeeLeaveRequests />} />
      </Route>
     
    </Routes>
  );
};
export default App;
