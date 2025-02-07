import React, { useState, useEffect } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress for loading spinner

const MAX_FILE_SIZE_MB = 1; // Maximum file size in MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert to bytes

// Country codes data
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+49", name: "Germany" },
  // Add more country codes as needed
];

export const AddEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    branchId: "",
    jobTitle: "",
    employeeId: "",
    shiftId: "",
    profileImage: null,
    idCard: null,
    dateOfJoining: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    address: "",
    departmentId: "",
    isActive: true,
  });

  const [shifts, setShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading
  const api = useAxios();

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/shifts`);
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/branches`);
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // Check if file exceeds maximum size
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      Swal.fire({
        title: "Error!",
        text: `File size should not exceed ${MAX_FILE_SIZE_MB} MB.`,
        icon: "error",
      }).then(() => {
        // Clear the file input field
        e.target.value = ""; // Resets the file input
      });
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Validate mobile number length
    if (formData.mobile.length !== 10) {
      Swal.fire({
        title: "Error!",
        text: "Mobile number must be exactly 10 digits.",
        icon: "error",
      });
      return;
    }

    setLoading(true); // Start loading when the form is submitted

    const employeeData = new FormData();
    for (const key in formData) {
      employeeData.append(key, formData[key]);
    }

    try {
      const response = await api.post(
        `${API_BASE_URL}/crm/admin/crm/register`,
        employeeData
      );

      if (response && response.data) {
        // Handle potential validation errors from backend
        const errorMessage =
          typeof response.data === "string"
            ? response.data
            : response.data.message || "An error occurred";

        if (errorMessage.includes("Mobile number already exists")) {
          Swal.fire({
            title: "Error!",
            text: "The mobile number already exists. Please use a different number.",
            icon: "error",
          });
          return; // Return early to prevent clearing form
        } else if (errorMessage.includes("Email already exists")) {
          Swal.fire({
            title: "Error!",
            text: "The email already exists. Please use a different email.",
            icon: "error",
          });
          return; // Return early to prevent clearing form
        }
      }

      // If no validation errors, clear the form
      setFormData({
        fullName: "",
        companyName: "",
        branchId: "",
        jobTitle: "",
        employeeId: "",
        shiftId: "",
        profileImage: null,
        idCard: null,
        dateOfJoining: "",
        email: "",
        mobile: "",
        countryCode: "+91", // Reset to default
        address: "",
        departmentId: "",
        isActive: true,
      });

      Swal.fire({
        title: "Employee added successfully!",
        text: `Employee ID: ${response.data.id}`,
        icon: "success",
      });
      console.log(formData);
    } catch (error) {
      console.error("Error adding employee:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an unexpected error adding the employee.",
        icon: "error",
      });
    } finally {
      setLoading(false); // Stop loading when the form submission is finished
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
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>

          <Link underline="hover" key="2" color="inherit" href="/add-employees">
            Add Employee
          </Link>
        </Breadcrumbs>
      </div>
      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "#098666" }}>
          Employee Registration Form
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px " }}>
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
                  value={formData.fullName}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="companyName"
                  className="col-sm-7 col-form-label fw-bold text-end"
                >
                  Company Name*
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Branch Name */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="branchId"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Branch Name*
                </label>
              </div>

              <div className="col-sm-7">
                <select
                  name="branchId"
                  id="branchId"
                  className="form-control"
                  value={formData.branchId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Branch
                  </option>
                  {branch.map((branchItem) => (
                    <option key={branchItem.id} value={branchItem.id}>
                      {branchItem.branchName} {branchItem.id}
                    </option>
                  ))}
                </select>
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
                  value={formData.jobTitle}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter designation"
                  required
                />
              </div>
            </div>

            {/* Employee ID */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="employeeId"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Employee ID*
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter reference id"
                  required
                />
              </div>
            </div>

            {/* Shifts - Select Input */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="shiftId"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Shift*
                </label>
              </div>
              <div className="col-sm-7">
                <select
                  id="shiftId"
                  name="shiftId"
                  value={formData.shiftId}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="select shift"
                  required
                >
                  <option value="" disabled>
                    Select Shift
                  </option>
                  {shifts.map((shift) => (
                    <option key={shift.id} value={shift.id}>
                      {shift.shiftName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date of Joining */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="dateOfJoining"
                  className="col-sm-7 col-form-label fw-bold text-end"
                >
                  Date of Joining*
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  className="form-control"
                  onChange={handleChange}
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
                  value={formData.email}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
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
              <div className="col-sm-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  className="form-control"
                  onChange={handleChange}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-5">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="address"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Address*
                </label>
              </div>
              <div className="col-sm-7">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            {/* Shifts - Select Input */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="departmentId"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Department*
                </label>
              </div>
              <div className="col-sm-7">
                <select
                  id="departmentId"
                  name="departmentId"
                  value={formData.departmentId}
                  className="form-control"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((shift) => (
                    <option key={shift.id} value={shift.id}>
                      {shift.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Profile Image */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="profileImage"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Profile Image*
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            {/* ID Card */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="idCard"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Govt ID Card*
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="file"
                  id="idCard"
                  name="idCard"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            {/* Is Active Checkbox */}
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <label
                  htmlFor="isActive"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Is Active
                </label>
              </div>
              <div className="col-sm-7">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      isActive: !prevData.isActive,
                    }))
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="row pb-3">
              <div className="col-sm-3"></div>
              <div className="col-sm-7 d-grid gap-2">
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#098666", color: "white" }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Base>
  );
};
