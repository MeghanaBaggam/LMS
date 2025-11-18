import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login.jsx'
import HRDashboard from './Pages/HRDashboard';

import ManageEmployees from './Components/ManageEmployees.jsx';
import LeaveBalance from './Components/LeaveBalance.jsx';
import LeaveRequests from './Components/LeaveRequests.jsx';
import TeamLeaveRequests from './Components/TeamLeaveRequests.jsx';
import TeamDetails from './Components/TeamDetails.jsx';
import EmployeeLeaveRequests from './Components/EmployeeLeaveRequest.jsx';
import { EmployeeDashboard } from './Pages/EmployeeDashboard.jsx';
import ManagerDashboard from './Pages/ManagerDashboard.jsx';
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />


      {/* nested routes for employee */}
      <Route path="/employee" element={<EmployeeDashboard />}>
        <Route path="leave-balance" element={<LeaveBalance />} />
        <Route path="leave-requests" element={<LeaveRequests />} />
      </Route>

      {/* nested routes for Manager */}
      <Route path="/manager" element={<ManagerDashboard />}>
        <Route path="leave-balance" element={<LeaveBalance />} />
        <Route path="leave-requests" element={<LeaveRequests />} />
        <Route path="team-details" element={<TeamDetails />} />
        <Route path="team-leave-requests" element={<TeamLeaveRequests />} />
      </Route>

      {/* nested routes for HR*/}
      <Route path="/hr" element={<HRDashboard />}>


        <Route index element={<LeaveRequests />} />

        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="leave-balance" element={<LeaveBalance />} />
        <Route path="leave-requests" element={<LeaveRequests />} />
        <Route path="team-details" element={<TeamDetails />} />
        <Route path="team-leave-requests" element={<TeamLeaveRequests />} />
        <Route path="employee-leave-requests" element={<EmployeeLeaveRequests />} />

      </Route>
    </Routes>
  );
};
export default App;
