import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Button, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAxios from "../auth/useAxios";
import {API_BASE_URL} from "../auth/Api"

export const EditEmployee = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const api = useAxios();
  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    mobile: "",
    address: "",
    days: "",
    isActive: false,
  });
  const [initialData, setInitialData] = useState(null); // Store initial data

  // Fetch existing employee data on component mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get(
          `${API_BASE_URL}/crm/admin/crm/crm-employee/${empId}`
        );
        const data = response.data;

        const employeeWithStatus = {
          ...data,
          isActive: data.active, // Ensure it's a boolean
        };

        setEmployeeData(employeeWithStatus);
        setInitialData(employeeWithStatus); // Set initial data
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    fetchEmployeeData();
  }, [empId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/; // Regex for a 10-digit mobile number
    return mobileRegex.test(mobile);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === "true"; // Convert string to boolean
    setEmployeeData((prevData) => ({
      ...prevData,
      isActive: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobileNumber(employeeData.mobile)) {
      Swal.fire({
        title: "Invalid mobile number",
        text: "Please enter a valid 10-digit mobile number.",
        icon: "error",
      });
      return;
    }
    

    // Check if data has changed
    if (JSON.stringify(employeeData) === JSON.stringify(initialData)) {
      Swal.fire({
        text: `No changes made in employee details`,
      });
      return;
    }


    const formData = new FormData();
    

    // Append text fields
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });

    try {
      await api.put(
        `${API_BASE_URL}/crm/admin/crm/edit-crm-employee/${empId}`,
        formData
      );
      Swal.fire({
        title: `Employee details updated`,
        text: ``,
      });
      
      navigate(-1);
    } catch (error) {
      console.error("Error updating employee", error);
      alert("Failed to update employee.");
    }
  };

  return (
    <Base>
      <div
        className="pt-3 mt-5 d-flex align-items-center"
        style={{
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          style={{
            color: "darkslategrey",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Back
        </Button>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            underline="none"
            color="inherit"
            href="/list-employees"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Employees
          </Link>
          <Link
            underline="none"
            color="inherit"
            href={`/employee-details/${empId}`}
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Edit Employee
          </Link>
          
        </Breadcrumbs>
      </div>

      <h2
        className="text-center fw-bold pt-3"
        style={{ color: "darkslategrey" }}
      >
        Edit Employee
      </h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "90%" }} />
      </div>

      <div className="container pt-3">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="row pb-3">
            <div
              className="col-sm-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <label
                htmlFor="fullName"
                className="col-sm-5 col-form-label fw-bold text-end"
              >
                Full Name*
              </label>
            </div>
            <div className="col-sm-7">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={employeeData.fullName}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="row pb-3">
            <div
              className="col-sm-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <label
                htmlFor="jobTitle"
                className="col-sm-5 col-form-label fw-bold text-end"
              >
                Job Title*
              </label>
            </div>
            <div className="col-sm-7">
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={employeeData.jobTitle}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="row pb-3">
            <div
              className="col-sm-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <label
                htmlFor="email"
                className="col-sm-5 col-form-label fw-bold text-end"
              >
                Email*
              </label>
            </div>
            <div className="col-sm-7">
              <input
                type="email"
                id="email"
                name="email"
                value={employeeData.email}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="row pb-3">
            <div
              className="col-sm-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <label
                htmlFor="mobile"
                className="col-sm-5 col-form-label fw-bold text-end"
              >
                Mobile*
              </label>
            </div>
            <div className="col-sm-7">
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={employeeData.mobile}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="row pb-3">
            <div
              className="col-sm-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <label
                htmlFor="isActive"
                className="col-sm-5 col-form-label fw-bold text-end"
              >
                Active
              </label>
            </div>
            <div className="col-sm-7">
              <select
                id="isActive"
                name="isActive"
                value={employeeData.isActive ? "true" : "false"}
                onChange={handleStatusChange}
                className="form-control"
                style={{
                  color: employeeData.isActive ? "green" : "red",
                }}
              >
                <option
                  value="true"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  Active
                </option>
                <option
                  value="false"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  Inactive
                </option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-dark">
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
