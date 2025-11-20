import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { UserService } from "../Services/userService";

export const TeamDetails = () => {
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);

  const fetchEmp = async () => {
    try {
      const response = await UserService.getAllUsers();
      setTeam(response.data);
    } catch (error) {
      console.log("Fetch Error", error);
    }
  };
  useEffect(() => {
    fetchEmp();
  }, []);

  const filterdTeam = team
    .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()))
    .filter((emp) => (roleFilter ? emp.role === roleFilter : true));
    
  const finalList = selectedManager
    ? team.filter((emp) => emp.manager_id === selectedManager.id)
    : filterdTeam;
  return (
    <div className="team-details-container">
      <div className="team-header-row">
        <h2 className="employee-list-title">
          {selectedManager
            ? `${selectedManager.name}'s Team`
            : "Employees List"}
        </h2>
        <div className="team-filters">
          {selectedManager && (
            <button
              className="back-btn"
              onClick={() => setSelectedManager(null)}
            >
              Back
            </button>
          )}
          <input
            type="text"
            placeholder="Search Employee"
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="role-select"
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setSelectedManager(null);
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
                setSelectedManager(emp);
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
