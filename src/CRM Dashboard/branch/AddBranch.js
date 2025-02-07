import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress";

export const AddBranch = () => {
  const [branchName, setBranchName] = useState("");
  const [branchDescription, setBranchDescription] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state
  const api = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await api.post(
        `${API_BASE_URL}/crm/admin/create-branch`,
        {
          branchName: branchName,
          branchDescription: branchDescription,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      setBranchName("");
      setBranchDescription("");
      setLoading(false); // Stop loading after response

      console.log(response.data);
      Swal.fire({
        title: `${branchName} added successfully`,
        text: `${branchDescription}`,
      });
    } catch (error) {
      setLoading(false); // Stop loading if error occurs
      console.error("Error adding department:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error adding the department.",
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
            underline="none"
            key="2"
            color="inherit"
            href="/add-department"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Add Branch
          </Link>
        </Breadcrumbs>
      </div>

      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Add Branch
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px " }}>
            <div className="row pb-3">
              <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="department" className="col-sm-2 col-form-label fw-bold">
                  Branch*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="department"
                  value={branchName}
                  className="form-control"
                  onChange={(e) => setBranchName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="departmentDescription" className="col-sm-2 col-form-label fw-bold">
                  Description*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="departmentDescription"
                  value={branchDescription}
                  className="form-control"
                  onChange={(e) => setBranchDescription(e.target.value)}
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
              disabled={loading} // Disable button when loading
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
