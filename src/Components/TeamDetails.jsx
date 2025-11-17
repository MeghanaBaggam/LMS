import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { loadConfigFromFile } from 'vite';

export const TeamDetails = () => {
    const [team,setTeam]=useState("");
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const token=localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user"));

    const fetchEmp=async ()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeam(response.data);
        }catch(error){
            console.log("Fetch Error",error);
        }
    }
    useEffect(()=>{
        fetchEmp();
    },[]);

const filterdTeam=team.filter((emp)=>emp.name.toLowerCase().includes(search.toLowerCase()))
                     .filter(emp=>(roleFilter ?emp.role===roleFilter:true));
  return (
    <div className='team-details-container'>
       <h2 className='employee-list-title'>Employees List</h2>
       <div className='team-filters'>
       <input
       type="text"
       placeholder="Search Employee"
       className="search-input"
       onChange={(e)=>setSearch(e.target.value)}
       />
       <select 
       className='role-select'
       onChange={(e)=>setRoleFilter(e.target.value)}>
        <option value="">All Roles</option>
        <option value="hr">HR</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
       </select>
</div>
<div className='team-cards-layout'>
{filterdTeam.map((emp)=>(
    <div className='team-card' key={emp.id}>
        <div className='team-card-header'>
             <FaUserCircle className='team-avtar'/>
             <span className='emp-id'>{emp.id}</span>
        </div>

        <h3 className='emp-name'>{emp.name}</h3>
        <p className='emp-role'>{emp.role}</p>
        <p className='emp-email'>{emp.email}</p>
        <p className='emp-manager'>Reporting To:{emp.manager?.name||"-"}</p>
        <p className='leave-balance'><strong>Leave Balance:</strong>{emp.leave_balance}</p>
    </div>
))
}
    
</div>
    </div>
  );
};

export default TeamDetails;