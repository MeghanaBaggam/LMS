const tabs = [
  { path: "leave-balance", label: "Leave Balance", permission: ["hr", "manager", "employee"] },
  { path: "leave-requests", label: "Leave Requests", permission: ["hr", "manager", "employee"] },
  { path: "team-details", label: "Team Details", permission: ["hr", "manager","employee"] },
  { path: "team-leave-requests", label: "Team Leave Requests", permission: ["hr", "manager"] },
  { path: "manage-employees", label: "Manage Employees", permission: ["hr"] },
  { path: "employee-leave-requests", label: "Employee Leave Requests", permission: ["hr"] },
];
export default tabs;