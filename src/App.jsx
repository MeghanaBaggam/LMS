import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { Login } from './Pages/Login.jsx'
import HRDashboard from './Pages/HRDashboard';

import ManageEmployees from './Components/ManageEmployees.jsx';
import LeaveBalance from './Components/LeaveBalance.jsx';
import LeaveRequests from './Components/LeaveRequests.jsx';
import TeamLeaveRequests from './Components/TeamLeaveRequests.jsx';
import TeamDetails from './Components/TeamDetails.jsx';
import EmployeeLeaveRequests from './Components/EmployeeLeaveRequest.jsx
export const App = () => {
  return (
   <Routes>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/hr" element={<HRDashboard/>}></Route>
    <Route path="leave-balance" element={<LeaveBalance/>}></Route>
    <Route path="leave-requests" element={<LeaveRequests/>}></Route>
    <Route path="team-details" element={<TeamDetails/>}></Route>
    <Route path="team-leave-requests" element={<TeamLeaveRequests/>}></Route>
   <Route path="manage-employees" element={<ManageEmployees/>}></Route>
    <Route path="employee-leave-requests" element={<EmployeeLeaveRequests/>}></Route>
   </Routes>
  );
};
export default App;
