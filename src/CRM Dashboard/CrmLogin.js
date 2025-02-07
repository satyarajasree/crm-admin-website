import React, { useRef, useState } from "react";
import "./styles/form.css";
import image from "./assets/login2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "./auth/Api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CrmLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login || {}, // Default to an empty object if login is undefined
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_BASE_URL}/crm/admin/login`, {
        username,
        password,
      });
      login(response.data);
      toast.success("Login successful! Redirecting to dashboard ...", {
        autoClose: 4000,
      });
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard after toast
      }, 3000);
    } catch (err) {
      setError("Invalid credentials");
      toast.error("Login failed! Please check your credentials.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const lottieRef = useRef(null);

  return (
    <div className="login-container">
      <ToastContainer position="top-center" />
      <div className="form-container">
        <center>
       
    <DotLottieReact
      src="https://lottie.host/fa60c9e1-893f-45c5-b4dc-f5009450978a/hQsQPhKTNk.lottie"
      loop
      autoplay
    />

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
