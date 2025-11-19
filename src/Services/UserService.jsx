import React from 'react'
import api from './api';

export const UserService = {

    getAllUsers:()=>{
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
    }
};
