import React, { useState, useEffect } from 'react';
import { UserService } from '../Services/userService';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
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
            const response = await UserService.getAllUsers();
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
            await UserService.createUser({
                name,
                email,
                password,
                role,
              manager_id:managerId
            });
            fetchEmp();
            setShowAdd(false);

        } catch (error) {
            console.log("Add Error", error);
        }
    };

    const updateEmp = async () => {
        try {
            await UserService.updateUser({\
                name,
                email,
                role,
                manager_id:managerId
            })

            fetchEmp();
            setShowEdit(false);

        } catch (error) {
            console.log("Update Error:", error);
        }
    };

    const deleteEmp = async (id) => {
        if (!window.confirm("Are You sure you want to delete this employee?")) return;

        try {
            await UserService.deleteUser(id)
            fetchEmp();
        } catch (error) {
            console.log("error", error);
        }
    };

    const columns = [
        { headerName: "ID", field: "id", sortable: true, filter: true, width: 250 },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Email", field: "email" },
        { headerName: "Roles", field: "role", sortable: true },
        { headerName: "Manager", field: "manager.name" },
        { headerName: "Manager ID", field: "manager_id" },
        {
            headerName: "Actions",
            field: "actions",
            width: 200,
            cellRenderer: (params) => (
                <div>
                    <button
                        className='edit-btn'
                        onClick={() => {
                            setShowEdit(true);
                            setEditId(params.data.id);
                            setName(params.data.name);
                            setEmail(params.data.email);
                            setRole(params.data.role);
                            setManagerId(params.data.manager_id);
                        }}>
                        Edit
                    </button>

                    <button
                        className='delete-btn'
                        onClick={() => deleteEmp(params.data.id)}>
                        Delete
                    </button>
                </div>
            )
        },
    ];

    const filteredEmp = employees
        .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
        .filter(emp => (roleFilter ? emp.role === roleFilter : true))

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

            <AgGridReact theme={themeQuartz}
                rowData={filteredEmp}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={60}
                paginationPageSizeSelector={[5, 10, 15, 20]}
                domLayout='autoHeight'
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
