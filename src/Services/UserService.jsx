import React from 'react'
import api from './api';

export const UserService = {

    getAllUsers(){
        return api.get("/users");
    },

    createUser(){
        return api.post("/users",data);
    },

    updateUser(){
        return api.put(`/users/${id}`,data);
    },
    deleteUser(){
        return api.delete(`/users/${id}`);
    }
};
