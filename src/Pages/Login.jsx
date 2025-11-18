import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import paltechLogo from '../Images/logo.jpg';
import bg from '../Images/paltech.jpg';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/login", {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.user;
      const role = response.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login Successful!!");


      if (role === 'hr') {
        navigate('/hr');
      }
      if (role === 'manager') {
        navigate('/manager');
      }
      if (role === 'employee') {
        navigate('/employee');
      }
    } catch (error) {
      setMessage("Invalid Credentials");
    }

  };
  return (

    <div className='split-screen'>
      <div className='left'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}>

        <img src={paltechLogo} alt="Paltech Logo" className="logo" />
        <h3>Employee Leave Management System</h3>
      </div>

      <div className='right'>
        <div className='form-container'>
          {message && (
            <p
              className={`message ${message.includes("Successful") ? "success" : "error"
                }`}
            >
              {message}
            </p>
          )}
          <form className='login' onSubmit={handleSubmitForm}>
            <div className='formgroup'>
              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email'
                className='userData'
                required /><br />
            </div>
            <div className='formgroup'>
              <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your Password'
                className='userData'
                required /><br />
              <button type='submit' className='userButton'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};
export default Login;
