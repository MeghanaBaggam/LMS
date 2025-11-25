import api from './api';

export const UserService = {
    getUsers:()=>{
        return api.get("/users");
    },

    createUser:(userData)=>{
        return api.post("/users",userData);
    },

    updateUser:(id,userData)=>{
        return api.put(`/users/${id}`,userData);
    },
    deleteUser:(id)=>{
        return api.delete(`/users/${id}`);
    },
    loginUser:(userData)=>{
        return api.post("/user/login",userData);
    },
    createLeave: (leaveData) => {
        return api.post("/leaves", leaveData);
    },
    getLeaves: () => {
        return api.get("/leaves");
    },
    approveLeave: (leaveId,data) => {
        return api.post(`/leaves/${leaveId}/approve`,data);
    },

    rejectLeave: (leaveId, reason) => {
        return api.post(`/leaves/${leaveId}/reject`, { reason });
    },
};
