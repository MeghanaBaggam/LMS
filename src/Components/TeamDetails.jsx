import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { fetchEmp } from "../store/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";

export const TeamDetails = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  const [state, setState] = useState({
    search: "",
    roleFilter: "",
    selectedManager: null,
  });

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    fetchEmp();
  }, [dispatch]);

  const filterdTeam = useMemo(() => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(state.search.toLowerCase())
      )
      .filter((emp) =>
        state.roleFilter ? emp.role === state.roleFilter : true
      );
  }, [state.team, state.search, state.roleFilter]);

  const finalList = useMemo(() => {
    return state.selectedManager
      ? state.team.filter((emp) => emp.manager_id === state.selectedManager.id)
      : filterdTeam;
  }, [state.selectedManager, employees, filterdTeam]);

  return (
    <div className="team-details-container">
      <div className="team-header-row">
        <h2 className="employee-list-title">
          {state.selectedManager
            ? `${state.selectedManager.name}'s Team`
            : "Employees List"}
        </h2>
        <div className="team-filters">
          {state.selectedManager && (
            <button
              className="back-btn"
              onClick={() => updateState({ selectedManager: null })}
            >
              Back
            </button>
          )}
          <input
            type="text"
            placeholder="Search Employee"
            className="search-input"
            onChange={(e) => updateState({ search: e.target.value })}
          />
          <select
            className="role-select"
            onChange={(e) => {
              updateState({ roleFilter: e.target.value,selectedManager: null });
  
            }}
          >
            <option value="">All Roles</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      <div className="team-cards-layout">
        {finalList.map((emp) => (
          <div
            className="team-card"
            key={emp.id}
            onClick={() => {
              if (emp.role === "manager") {
                updateState({ selectedManager: emp });
              }
            }}
            style={{ cursor: emp.role === "manager" ? "pointer" : "default" }}
          >
            <div className="team-card-header">
              <FaUserCircle className="team-avtar" />
              <span className="emp-id">{emp.id}</span>
            </div>
            <h3 className="emp-name">{emp.name}</h3>
            <p className="emp-role">{emp.role}</p>
            <p className="emp-email">{emp.email}</p>
            <p className="emp-manager">
              Reporting To:{emp.manager?.name || "-"}
            </p>
            <p className="leave-balance">
              <strong>Leave Balance:</strong>
              {emp.leave_balance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
