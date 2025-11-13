import React, { useState } from 'react';
import paltechLogo from '../Images/logo.jpg';
export const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const handleSubmitForm=(e)=>{
        e.preventDefault();
        if(email && password){
         
            setMessage("Login Successful"+a);
        }
        else{
            setMessage("Invalid credentials");
        }
         setEmail("");
    setPassword("");
    }
   
  return (
    
        <div className='split-screen'>
      <div className='left'>
       
         <img src={paltechLogo} alt="Paltech Logo" className="logo"/>
          <h3>Employee Leave Management System</h3>
      </div>

        {message && <p className={`message ${message.includes('Successful') ? 'success':'error'}`}>{message}</p>}
      <div className='right'>
        <div className='form-container'>
       <form  className='login'>
        <div className='formgroup'>
        <input type="email" value={email}
         id="email" 
         onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter your Email'
          className='userData'
          required/><br/>
          </div>
          <div className='formgroup'>
        <input type="password"
         value={password}
          id="password" 
          onChange={(e)=>setPassword(e.target.value)} 
          placeholder='Enter your Password' 
          className='userData'
          required/><br/>
        <button onClick={(e)=>handleSubmitForm("1",e)} type='submit' className='userButton'>Login</button>
        </div>
       </form>
       </div>
       </div>
       </div>
    
  )
}
