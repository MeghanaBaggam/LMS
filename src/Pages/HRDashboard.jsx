import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
export const HRDashboard = () => {
    const [employees,setEmployees]=useState([]);
    const [search,setSearch]=useState("");
    const [roleFilter,setRoleFilter]=useState("");
    const [showAdd,setShowAdd]=useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [managerId,setManagerId]=useState("");

    const [editId,setEditIt]=useState(null);

    const token=localStorage.getItem("token");
    const fetchEmp=async ()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/employees",{
                headers:{Authorization:`Bearer ${token}`},
            });
            setEmployees(response.data);
        }catch(error){
            console.log("Error fetching data",error);
        }
    };
useEffect(()=>{
        fetchEmp();
    },[]);
    const addEmp=async ()=>{
        try{
            await axios.post("http://127.0.0.1:8000/api/employees",{
                name,
                email,
                password,
                role,
                manager_id:managerId

            },{
                headers:{Authorization:`Bearer ${token}`}
            });
            fetchEmp();
            setShowAdd(false);
        }catch(error){
            console.log("Add Error",error);
        }
    };
    const updateEmp=async ()=>{
        try{
            await axios.put(`http://127.0.0.1:8000/api/employees/${editId}`,{
                name,
                email,
                password,
                role,
                manager_id:managerId
            },{
                headers:{Authorization:`Bearer ${token}`}
                
            });
            fetchEmp();
            setShowEdit(false);
        }catch(error){
            console.log("Update Error:",error);
        }
    };
    

    const deleteEmp=async (id)=>{
        if(!window.confirm("Are You sure you want to delete this employee?"))
        {
             return;
        }
        try{
            await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`,{
                  headers:{Authorization:`Bearer ${token}`},
            });
            fetchEmp();
        }catch(error){
            console.log("error",error);
        } 
    };
    console.log("showAdd:", showAdd);
  return (
    <div className='hr-container'>
        <h2 className='welcome-text'>Welcome Back,HR!</h2>

        <div className='filters'>
            <input
            type='text'
            placeholder='Search Employee'
            onChange={(e)=>setSearch(e.target.value)}
            className='search-input'
            />
        <select
        onChange={(e)=>setRoleFilter(e.target.value)}
        className='role-select'
        >
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
        </select>
    <button className='add-employee-btn' onClick={()=>setShowAdd(true)} >Add New Employee</button>
        </div>

        <table className='employee-table'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Reporting To</th>
                    <th>Manager ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.filter((emp)=>emp.name.toLowerCase().includes(search.toLowerCase()))
                            .filter((emp)=>(roleFilter ? emp.role ===roleFilter:true))
                            .map((emp)=>(
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.role}</td>
                                   <td>{emp.manager?.name||"-"}</td>
                                   <td>{emp.manager_id || "-"}</td>
                                   <td>
                                    <button className='edit-btn' onClick={updateEmp}>Edit</button>
                                    <button className='delete-btn' onClick={deleteEmp}>Delete</button>
                                   </td>
                                   </tr>
                  ))
                }
            </tbody>
        </table>

        {
            showAdd && (
                <div className='model'>
                     <div className='model-content'>
                        <h3>Add New Employee</h3>

                        <input placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                        <input placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>

                        <select onChange={e=>setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                       <select onChange={e => setManagerId(e.target.value)}>     
                           <option value="">Select Manager</option>
                           {employees
                            .filter(u=>u.role==="manager")
                            .map(m=>(
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))
                           }
                        </select>
                        <button onClick={addEmp}>Save</button>
                        <button onClick={()=>setShowAdd(false)}>Cancel</button>

                     </div>
                </div>
            )
        }
    </div>
  );
};
export default HRDashboard;
