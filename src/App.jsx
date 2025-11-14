import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { Login } from './Pages/Login.jsx'
import HRDashboard from './Pages/HRDashboard';
export const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/hr" element={<HRDashboard/>}></Route>
   </Routes>
  );
};
export default App;
