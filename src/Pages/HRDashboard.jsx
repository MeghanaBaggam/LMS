import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
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
     const [editId,setEditId]=useState(null);

     const [showMenu,setShowMenu]=useState(false);
     const [showProfile,setShowProfile]=useState(false);

    const token=localStorage.getItem("token");

    const user=JSON.parse(localStorage.getItem("user"));
    const userInitials=user?.name
    ? user.name.split(" ").map(n=>n[0].join(" ").toUpperCase):"U";


    const fetchEmp=async ()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/users",{
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
            await axios.post("http://127.0.0.1:8000/api/users",{
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
            await axios.put(`http://127.0.0.1:8000/api/users/${editId}`,{
                name,
                email,
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
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`,{
                  headers:{Authorization:`Bearer ${token}`},
            });
            fetchEmp();
        }catch(error){
            console.log("error",error);
        } 
    };
   const logoutUser=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href="/";
   }
  return (
    <div className='hr-container'>
        {/* for profile section */}
        <div className='user-section'>
            <div className='user-avtar' onClick={()=>setShowMenu(!showMenu)}>
               <FaUserCircle />
            </div>

        </div>
        {
            showMenu && (
                <div className='dropdown-menu'>
                    <p onClick={()=>setShowProfile(true)}>Profile</p>
                    <p onClick={logoutUser}>Logout</p>
                </div>
            )
        }
        {
            showProfile && (
                <div className='model'>
                    <div className='model-content'>
                        <h3>User Profile</h3>
                        <p><strong>ID:</strong>{user?.id}</p>
                        <p><strong>Name:</strong>{user?.name}</p>
                         <p><strong>Email:</strong> {user?.email}</p>
                         <p><strong>Role:</strong> {user?.role}</p>
                        <p><strong>Manager ID:</strong> {user?.manager_id || "-"}</p>
                        <button onClick={()=>setShowProfile(false)}>Close</button>
                        </div>
                    </div>
            )
        }
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
                                    <button className='edit-btn' onClick={()=>{
                                        setShowEdit(true);
                                        setEditId(emp.id);
                                        setName(emp.name);
                                        setEmail(emp.email);
                                        setRole(emp.role);
                                        setManagerId(emp.manager_id);
                                    }}>Edit</button>
                                    <button className='delete-btn' onClick={()=>deleteEmp(emp.id)}>Delete</button>
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

                        <input placeholder='Name' onChange={(e)=>setName(e.target.value)} required/>
                        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
                        <input placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)} required/>

                        <select onChange={e=>setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                       <select onChange={e => setManagerId(e.target.value)}>     
                           <option value="">Select Manager</option>
                           {employees
                            .filter(u=>u.role==="manager" || u.role==="hr")
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

        {
            showEdit && (
                <div className='model'>
                     <div className='model-content'>
                        <h3>Edit Employee</h3>

                        <input value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)}/>


                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="hr">HR</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>

                    <select value={managerId} onChange={(e)=>setManagerId(e.target.value)}>
                        <option value="">Select Manager</option>
                        {employees
                        .filter(u=>u.role==="manager"|| u.role==="hr")
                        .map(m=>(
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))
                        }
                    </select>

                    <button onClick={updateEmp}>Update</button>
                    <button onClick={()=>setShowEdit(false)}>Cancel</button>
                     
                </div>
                </div>
            )
        }
    </div>
  );
};
export default HRDashboard;
