import React, { useState } from "react";
import "./styles/form.css";
import image from "./assets/login2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrmLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post("https://crm-java.onrender.com/crm/admin/login", {
        username,
        password,
      });
      login(response.data); // Save the token
      toast.success("Login successful! Redirecting to dashboard ...", { autoClose: 4000 });
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard after toast
      }, 3000);
    } catch (err) {
      setError("Invalid credentials or server error");
      toast.error("Login failed! Please check your credentials.", { autoClose: 3000 });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" />
      <div className="form-container">
        <center>
          <img className="img" src={image} alt="image1" width="70%" height="70%" />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </center>

        <form onSubmit={handleSubmit}>
          <h3 className="text-center fw-bold">CRM LOGIN</h3>
          <div className="form-group icon-input">
            <label htmlFor="username" className="text-center fw-bold">
              Username
            </label>
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group icon-input">
            <label htmlFor="password" className="fw-bold">
              Password
            </label>
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-submit" disabled={loading}>
            {loading ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default CrmLogin;