import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useAxios();

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
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
  
      Swal.fire({
        title: "Password Changed Successfully",
        text: response.data,
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      console.error("Error changing password:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error changing the password.",
        icon: "error",
      });
    }
  };
  

  return (
    <Base>
      <div
        className="pt-3 mt-5"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/change-password"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Change Password
          </Link>
        </Breadcrumbs>
      </div>

      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Change Password
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px " }}>
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="oldPassword"
                  className="col-sm-6 col-form-label fw-bold"
                >
                  Old Password*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  className="form-control"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="newPassword"
                  className="col-sm-6 col-form-label fw-bold"
                >
                  New Password*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  className="form-control"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="col-sm-6 col-form-label fw-bold"
                >
                  Confirm Password*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
