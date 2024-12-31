import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link, Typography, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAxios from "../auth/useAxios";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from "../auth/Api";
import "../styles/employeeDetails.css";

export const EmployeeDetails = () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(
          `${API_BASE_URL}/crm/admin/crm/crm-employee/${empId}`
        );
        // Assuming the API returns an employee object directly
        const empData = response.data;

        // Calculate `validUntil` date - 2 years from today
        const joinDate = new Date(empData.dateOfJoining);
        const validUntil = new Date(joinDate);
        validUntil.setFullYear(validUntil.getFullYear() + 2);

        const employeeWithStatus = {
          ...empData,
          isActive: empData.active, // Map `active` to `isActive`
          validUntil: validUntil.toLocaleDateString(),
        };
        setEmployee(employeeWithStatus); // Set the employee with status
      } catch (err) {
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [empId, api]);

  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  const handleDelete = async (empId, fullName) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the employee ${fullName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await api.delete(
          `${API_BASE_URL}/crm/admin/crm/delete-crm-employees/${empId}`
        );
        Swal.fire("Deleted!", "Your employee has been deleted.", "success");
        navigate("/list-employees");
      } catch (err) {
        console.error("Error deleting employee", err);
        Swal.fire(
          "Error!",
          "There was an error deleting the employee.",
          "error"
        );
      }
    }
  };

  const handleEditDetails = (empId) => {
    navigate(`/edit-employee/${empId}`); // Redirect to the employee detail page with the ID
  };

  return (
    <Base>
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "70px",
            }}
          >
            <ClipLoader color="darkslategrey" size={50} />
          </div>
        </>
      ) : (
        <>
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
                href="/"
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
              <Link underline="hover" color="inherit" href="add-employee">
                List Employees
              </Link>
            </Breadcrumbs>
          </div>

          <div className="card m-4 p-4">
            <Typography
              variant="h4"
              color="success"
              style={{ fontWeight: "bolder" }}
              gutterBottom
            >
              {employee.id}. {employee.fullName}
            </Typography>
            <hr />
            <div className="row">
              <div className="col-md-8">
                {/** Map through employee details for better code maintenance */}
                {[
                  { label: "Email", value: employee.email },
                  { label: "Designation", value: employee.jobTitle },
                  { label: "Mobile", value: employee.mobile },
                  { label: "Branch", value: employee.branchName },
                  { label: "Address", value: employee.address },
                  {
                    label: "Shift Time",
                    value: `${employee.shifts.shiftName} (${employee.shifts.startTime} to ${employee.shifts.endTime})`,
                  },
                  {
                    label: "Department",
                    value: employee.departments.department,
                  },
                  {
                    label: "Status",
                    value: employee.isActive ? "Active" : "Inactive",
                    color: employee.isActive ? "green" : "red",
                  },
                ].map(({ label, value, color }) => (
                  <div className="row pt-2" key={label}>
                    <div className="col-md-3">
                      <h6>{label}</h6>
                    </div>
                    <div className="col-md-9">
                      <h6
                        className="text-secondary"
                        style={{ color }}
                      >{`: ${value}`}</h6>
                    </div>
                    <hr
                      style={{
                        width: "80%",
                        margin: "0 12px",
                        border: "none",
                        borderTop: "1px solid black",
                      }}
                    />
                  </div>
                ))}

                <div className="row">
                  <div className="col-md-6">
                    <Typography
                      variant="h6"
                      style={{
                        padding: "10px",
                        color: "darkslategrey",
                        fontWeight: "bolder",
                      }}
                    >
                      Employee Govt.ID Proof
                    </Typography>
                    <img
                      src={employee.idCardPath}
                      alt="Employee Profile"
                      className="rounded"
                      style={{
                        width: "80%",
                        borderRadius: "5px",
                        border: "2px solid grey",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <Typography
                      variant="h6"
                      style={{
                        padding: "10px",
                        color: "darkslategrey",
                        fontWeight: "bolder",
                      }}
                    >
                      Employee Profile Image
                    </Typography>
                    <img
                      src={employee.profileImagePath}
                      alt="Employee Profile"
                      className="rounded"
                      style={{
                        width: "80%",
                        borderRadius: "5px",
                        border: "2px solid grey",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ paddingBottom: "10px" }}
                >
                  Employee Id card
                </Typography>

                <div className="container">
                  <div className="id-card" style={styles.card}>
                    <div style={styles.header}>
                      <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                        ID Card
                      </p>
                    </div>
                    <div style={styles.body}>
                      <img
                        src={employee.profileImagePath}
                        alt="Employee"
                        style={styles.photo}
                      />
                      <h5>{employee.name}</h5>
                      <p>{employee.jobTitle}</p>
                      <p>Department: {employee.departments.department}</p>
                      <p>Contact: {employee.mobile}</p>
                    </div>
                    <div style={styles.footer}>
                      <p>Valid Until: {employee.validUntil}</p>
                    </div>
                  </div>
                </div>

                <hr style={{ marginTop: "10px", width: "100%" }} />
                <div className="row">
                  <div className="col-md-6">
                    <button
                      className="btn btn-success"
                      onClick={() => handleEditDetails(employee.id)}
                      style={{ color: "white" }}
                    >
                      <EditIcon color="white" /> Edit
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(employee.id, employee.fullName)
                      }
                      style={{ color: "white" }}
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Base>
  );
};

const styles = {
  card: {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
  body: {
    padding: "15px",
    textAlign: "center",
  },
  photo: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  footer: {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    borderTop: "1px solid #ddd",
  },
};
