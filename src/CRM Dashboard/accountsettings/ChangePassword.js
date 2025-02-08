import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const api = useAxios();
  const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (oldPassword === newPassword) {
      Swal.fire({
        title: "Error",
        text: "New password cannot be the same as old password.",
        icon: "error",
      });
      setLoading(false);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "New password and confirm password do not match.",
        icon: "error",
      });
      setLoading(false);
      return;
    }
  
    try {
      const response = await api.post(
        `${API_BASE_URL}/crm/admin/change-password`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
  
      setLoading(false);
  
      if (response.data === "Password successfully changed.") {
        Swal.fire({
          title: "Success",
          text: "Password changed successfully.",
          icon: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        if (response.data === "Password successfully changed."){
          Swal.fire({
            title: "Success",
            text: response.data,
            icon: "success",
          });
        }else{
          Swal.fire({
            title: "Error",
            text: response.data,
            icon: "error",
          });
        }
        
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Errors",
        text: error.response?.data || "An error occurred while changing the password.",
        icon: "error",
      });
    }
  };
  

  return (
    <Base>
    <div className="pt-3 mt-5" style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/dashboard" sx={{ color: "darkslategrey", fontWeight: "bold" }}>Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/change-password" sx={{ color: "darkslategrey", fontWeight: "bold" }}>Change Password</Link>
      </Breadcrumbs>
    </div>

    <div className="pt-5">
      <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>Change Password</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "90%" }} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ padding: "0 20px" }}>
          
          {/* Old Password Field */}
          <div className="row pb-3">
            <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
              <label htmlFor="oldPassword" className="col-sm-6 col-form-label fw-bold">Old Password*</label>
            </div>
            <div className="col-sm-8">
              <TextField
                fullWidth
                type={showPassword.old ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleTogglePassword("old")} edge="end">
                        {showPassword.old ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          {/* New Password Field */}
          <div className="row pb-3">
            <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
              <label htmlFor="newPassword" className="col-sm-6 col-form-label fw-bold">New Password*</label>
            </div>
            <div className="col-sm-8">
              <TextField
                fullWidth
                type={showPassword.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleTogglePassword("new")} edge="end">
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="row pb-3">
            <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
              <label htmlFor="confirmPassword" className="col-sm-6 col-form-label fw-bold">Confirm Password*</label>
            </div>
            <div className="col-sm-8">
              <TextField
                fullWidth
                type={showPassword.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleTogglePassword("confirm")} edge="end">
                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "darkslategray",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </Base>
  );
};
