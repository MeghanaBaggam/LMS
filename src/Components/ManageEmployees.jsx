import React, { useState, useEffect } from 'react';
import { UserService } from '../Services/userService';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
const initialFormState = {
    name: "",
    email: "",
    password: "",
    role: "",
    managerId: ""
};
export const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [formData, setformData] = useState(initialFormState);
    const [editId, setEditId] = useState(null);

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setformData(prevData => ({ ...prevData, [name]: value }));
    };


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
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                manager_id: formData.managerId
            });
            fetchEmp();
            setShowAdd(false);
            setformData(initialFormState);

        } catch (error) {
            console.log("Add Error", error);
        }
    };

    const updateEmp = async () => {
        try {
            await UserService.updateUser(editId, {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                manager_id: formData.managerId
            });

            fetchEmp();
            setShowEdit(false);
            setformData(initialFormState);
            setEditId(null);

        } catch (error) {
            console.log("Update Error:", error);
        }
    };

    const deleteEmp = async (id) => {
        if (!window.confirm("Are You sure you want to delete this employee?")) return;

        try {
            await UserService.deleteUser(id);
            fetchEmp();
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleEditClick = (data) => {
        setShowEdit(true);
        setEditId(data.id);
        setformData({
            name: data.name,
            email: data.email,
            password: "",
            role: data.role,
            managerId: data.manager_id || "",
        });
        setShowEdit(true);
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
                            handleEditClick(params.data)
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
                    onClick={() => {
                        setShowAdd(true);
                        setformData(initialFormState);
                    }}
                >
                    Add New Employee
                </button>
            </div>

            <AgGridReact theme={themeQuartz}
                rowData={filteredEmp}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={5}
                paginationPageSizeSelector={[5, 10, 15, 20]}
                domLayout='autoHeight'
            />

            {showAdd && (
                <div className="model">
                    <div className="model-content">
                        <h3 >Add New Employee</h3>

                        <input name="name" placeholder="Name" value={formData.name} onChange={handleFormData} />
                        <input name="email" placeholder="Email" value={formData.email} onChange={handleFormData} />
                        <input name="password" type="password" value={formData.password} placeholder="Password" onChange={handleFormData} />

                        <select name="role" value={formData.role} onChange={handleFormData}>
                            <option value="">Select Role</option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>

                        <select name="managerId" value={formData.managerId} onChange={handleFormData}>
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

                        <input name="name" value={formData.name} onChange={handleFormData} />
                        <input name="email" value={formData.email} onChange={handleFormData} />

                        <select name="role" value={formData.role} onChange={handleFormData}>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>

                        <select name="managerId" value={formData.managerId} onChange={handleFormData}>
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
