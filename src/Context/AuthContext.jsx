import React from 'react'
import { createContext,useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider=({children})=> {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")));
    const [token,setToken]=useState(localStorage.getItem("token"));

    const login=(useData,tokenValue)=>{
        setUser(useData);
        setToken(tokenValue);
        localStorage.setItem("user",JSON.stringify(useData));
        localStorage.setItem("token",tokenValue);
    };
    const logout=()=>{
        setUser("");
        setToken("");
        localStorage.clear();
        window.location.href="/";
    };

  return (
   <AuthContext.Provider value={{user,token,login,logout}}>
    {children}
   </AuthContext.Provider>
  );
};
