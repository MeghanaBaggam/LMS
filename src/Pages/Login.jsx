import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import paltechLogo from "../Images/logo.jpg";
import bg from "../Images/paltech.jpg";
import { UserService } from "../Services/userService";

const initialFormState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [message, setMessage] = useState("");
  const [formData, setformData] = useState(initialFormState);

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.loginUser({
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      const user = response.data.user;
      const role = response.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login Successful!!");

      if (role === "hr") {
        navigate("/hr");
      }
      if (role === "manager") {
        navigate("/manager");
      }
      if (role === "employee") {
        navigate("/employee");
      }
    } catch (error) {
      setMessage("Invalid Credentials");
    }
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="split-screen">
      <div
        className="left"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={paltechLogo} alt="Paltech Logo" className="logo" />
        <h3>Employee Leave Management System</h3>
      </div>

      <div className="right">
        <div className="form-container">
          {message && (
            <p
              className={`message ${
                message.includes("Successful") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
          <form className="login" onSubmit={handleSubmitForm}>
            <div className="formgroup">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormData}
                placeholder="Enter your Email"
                className="userData"
                required
              />
              <br />
            </div>
            <div className="formgroup">
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFormData}
                placeholder="Enter your Password"
                className="userData"
                required
              />
              <br />
              <button type="submit" className="userButton">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
