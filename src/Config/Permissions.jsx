export const Permissions = {
  employee: ["leave-balance", "leave-requests"],
  manager: ["leave-balance", "leave-requests", "team-details", "team-leave-requests"],
  hr: ["leave-balance", "leave-requests", "team-details", "team-leave-requests", "manage-employees", "employee-leave-requests"]
};
export default Permissions;