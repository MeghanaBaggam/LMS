import React, { useState, useEffect, useCallback, useMemo } from "react";
import { UserService } from "../Services/UserService";
import { AgGridReact } from "ag-grid-react";
import { fetchEmp } from "../store/EmployeeSlice";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);
const initialFormState = {
  name: "",
  email: "",
  password: "",
  role: "",
  managerId: "",
};
export const ManageEmployees = () => {
 const dispatch=useDispatch();
 const employees=useSelector((state)=>state.employees.list);
 const loading=useSelector((state)=>state.employees.loading);
 const error=useSelector((state)=>state.employees.error);
  const [state, setState] = useState({
    search: "",
    roleFilter: "",
    showAdd: false,
    showEdit: false,
    formData: initialFormState,
    editId: null,
  });

  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handleFormData = useCallback((e) => {
    const { name, value } = e.target;
    updateState({ formData: { ...state.formData, [name]: value } });
  });
//fetch employees from the redux  
  useEffect(() => {
    dispatch(fetchEmp());
  }, [dispatch]);

  const addEmp = useCallback(async () => {
    try {
      await UserService.createUser({
        name: state.formData.name,
        email: state.formData.email,
        password: state.formData.password,
        role: state.formData.role,
        manager_id: state.formData.managerId,
      });
      dispatch(fetchEmp());
      updateState({ showAdd: false,formData: initialFormState });
    } catch (error) {
      console.log("Add Error", error);
    }
  }, [state.formData, dispatch]);

  const updateEmp = useCallback(async () => {
    try {
      await UserService.updateUser(state.editId, {
        name: state.formData.name,
        email: state.formData.email,
        role: state.formData.role,
        manager_id: state.formData.managerId,
      });
      dispatch(fetchEmp());
      updateState({ showEdit: false,formData: initialFormState ,editId: null });
    } catch (error) {
      console.log("Update Error:", error);
    }
  }, [state.editId, dispatch, state.formData]);

  const deleteEmp = useCallback(
    async (id) => {
      if (!window.confirm("Are You sure you want to delete this employee?"))
        return;
      try {
        await UserService.deleteUser(id);
        dispatch(fetchEmp());
      } catch (error) {
        console.log("error", error);
      }
    },
    [dispatch]
  );

  const handleEditClick = useCallback((data) => {
    updateState({ 
    showEdit: true,
    editId: data.id,
    formData: {
        name: data.name,
        email: data.email,
        password: "",
        role: data.role,
        managerId: data.manager_id || "",
      },
   });
  }, []);

  const columns = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        sortable: true,
        filter: true,
        width: 250,
      },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Email", field: "email" },
      { headerName: "Role", field: "role", sortable: true },
      { headerName: "Manager", field: "manager.name" },
      { headerName: "Manager ID", field: "manager_id" },
      {
        headerName: "Actions",
        field: "actions",
        width: 200,
        cellRenderer: (params) => (
          <div>
            <button
              className="edit-btn"
              onClick={() => {
                handleEditClick(params.data);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteEmp(params.data.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleEditClick, deleteEmp]
  );

  const filteredEmp = useMemo(() => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(state.search.toLowerCase())
      )
      .filter((emp) => (state.roleFilter ? emp.role === roleFilter : true));
  }, [employees, state.search, state.roleFilter]);

  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Search Employee"
          className="search-input"
          onChange={(e) => updateState({ search: e.target.value })}
        />
        <select
          className="role-select"
          onChange={(e) => updateState({ roleFilter: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="hr">HR</option>
        </select>
        <button
          className="add-employee-btn"
          onClick={() => {
            updateState({
              showAdd: true,
              formData: initialFormState,
            });
          }}
        >
          Add New Employee
        </button>
      </div>

      <AgGridReact
        theme={themeQuartz}
        rowData={filteredEmp}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 10, 15, 20]}
        domLayout="autoHeight"
      />

      {state.showAdd && (
        <div className="model">
          <div className="model-content">
            <h3>Add New Employee</h3>

            <input
              name="name"
              placeholder="Name"
              value={state.formData.name}
              onChange={handleFormData}
            />
            <input
              name="email"
              placeholder="Email"
              value={state.formData.email}
              onChange={handleFormData}
            />
            <input
              name="password"
              type="password"
              value={state.formData.password}
              placeholder="Password"
              onChange={handleFormData}
            />

            <select
              name="role"
              value={state.formData.role}
              onChange={handleFormData}
            >
              <option value="">Select Role</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>

            <select
              name="managerId"
              value={state.formData.managerId}
              onChange={handleFormData}
            >
              <option value="">Select Manager</option>
              {employees
                .filter((u) => u.role === "manager" || u.role === "hr")
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>

            <button onClick={addEmp}>Save</button>
            <button onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}
      {state.showEdit && (
        <div className="model">
          <div className="model-content">
            <h3>Edit Employee</h3>

            <input
              name="name"
              value={state.formData.name}
              onChange={handleFormData}
            />
            <input
              name="email"
              value={state.formData.email}
              onChange={handleFormData}
            />

            <select
              name="role"
              value={state.formData.role || ""}
              onChange={handleFormData}
            >
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>

            <select
              name="managerId"
              value={state.formData.managerId}
              onChange={handleFormData}
            >
              <option value="">Select Manager</option>
              {employees
                .filter((u) => u.role === "manager" || u.role === "hr")
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
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
