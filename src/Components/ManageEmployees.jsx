import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';


export const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [managerId, setManagerId] = useState("");
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");
    const fetchEmp = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchEmp();
    }, []);

    const addEmp = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/users", {
                name, email, password, role, manager_id: managerId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchEmp();
            setShowAdd(false);

        } catch (error) {
            console.log("Add Error", error);
        }
    };

    const updateEmp = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${editId}`, {
                name, email, role, manager_id: managerId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchEmp();
            setShowEdit(false);

        } catch (error) {
            console.log("Update Error:", error);
        }
    };

    const deleteEmp = async (id) => {
        if (!window.confirm("Are You sure you want to delete this employee?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchEmp();
        } catch (error) {
            console.log("error", error);
        }
    };

    const columns = [
        { name: <strong>Employee ID</strong>, selector: row => row.id, sortable: true },
        { name: <strong>Name</strong>, selector: row => row.name, sortable: true },
        { name: <strong>Email</strong>, selector: row => row.email },
        { name: <strong>Role</strong>, selector: row => row.role, sortable: true },
        { name: <strong>Reporting To</strong>, selector: row => row.manager?.name || "-" },
        { name: <strong>Manager ID</strong>, selector: row => row.manager_id || "-" },
        {
            name: <strong>Actions</strong>,
            cell: (row) => (
                <>
                    <button
                        className='edit-btn'
                        onClick={() => {
                            setShowEdit(true);
                            setEditId(row.id);
                            setName(row.name);
                            setEmail(row.email);
                            setRole(row.role);
                            setManagerId(row.manager_id);
                        }}>
                        Edit
                    </button>

                    <button
                        className='delete-btn'
                        onClick={() => deleteEmp(row.id)}>
                        Delete
                    </button>
                </>
            )
        },
    ];
  return (
    <>
     <div className="filters">
        <input
            type="text"
            placeholder="Search Employee"
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
        />
        <select
            className="role-select"
            onChange={(e) => setRoleFilter(e.target.value)}
         >
          <option value="">All Roles</option>
          <option value="employee">Employee</option>
           <option value="manager">Manager</option>
           <option value="hr">HR</option>
        </select>
         <button
            className="add-employee-btn"
            onClick={() => setShowAdd(true)}
        >
        Add New Employee
        </button>
        </div>
         <DataTable
            columns={columns}
            data={employees
            .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
            .filter(emp => (roleFilter ? emp.role === roleFilter : true))}
             pagination
         />
         {showAdd && (
            <div className="model">
            <div className="model-content">
              <h3 >Add New Employee</h3>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
             <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

             <select onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
             <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            </select>

             <select onChange={(e) => setManagerId(e.target.value)}>
                  <option value="">Select Manager</option>
                     {employees
                     .filter(u => u.role === "manager" || u.role === "hr")
                    .map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>

                <button onClick={addEmp}>Save</button>
                <button onClick={() => setShowAdd(false)}>Cancel</button>
           </div>
         </div>
    )}
    {showEdit && (
         <div className="model">
         <div className="model-content">
         <h3>Edit Employee</h3>

          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
           <option value="hr">HR</option>
           <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            </select>

          <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
         <option value="">Select Manager</option>
         {employees
            .filter(u => u.role === "manager" || u.role === "hr")
           .map(m => (
               <option key={m.id} value={m.id}>{m.name}</option>
              ))}
         </select>
                <button onClick={updateEmp}>Update</button>
                 <button onClick={() => setShowEdit(false)}>Cancel</button>
             </div>
        </div>
  )}

</>
    
  );
};
export default ManageEmployees;
