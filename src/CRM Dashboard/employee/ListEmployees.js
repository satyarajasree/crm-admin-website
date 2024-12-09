import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Button, Link, TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/table.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useAxios from "../auth/useAxios";
import * as XLSX from "xlsx";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("https://crm-java.onrender.com/crm/admin/crm/employees");
        const employeesWithStatus = response.data.map((emp) => ({
          ...emp,
          isActive: emp.active, // Map `active` to `isActive`
        }));
        setEmployees(employeesWithStatus);
        setTotalRecords(employeesWithStatus.length);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setRecordsPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * recordsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - recordsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalFilteredRecords = filteredEmployees.length;

  const handleViewDetails = (empId) => {
    navigate(`/employee-details/${empId}`);
  };

  const downloadExcel = () => {
    const sheetData = employees.map((emp) => ({
      "Full Name": emp.fullName,
      Email: emp.email,
      Mobile: emp.mobile,
      Address: emp.address,
      Status: emp.isActive ? "Active" : "Inactive",
      "Branch Name": emp.branchName,
      Designation: emp.jobTitle,
      profileImage: `https://crm-java.onrender.com/crm/admin/crm${emp.idCardPath}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "Employees_List.xlsx");
  };

  return (
    <Base>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}>
          <ClipLoader color="darkslategrey" size={50} />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div
            className="pt-3 mt-5"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
                Home
              </Link>
              <Link underline="none" key="2" color="inherit" href="/list-employees" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
                Employees
              </Link>
            </Breadcrumbs>
          </div>

          <h2 className="text-center fw-bold" style={{ color: "#0DD354" }}>Employees List</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <TextField
                type="number"
                label="Records per page"
                variant="outlined"
                size="small"
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                style={{ width: "150px", marginRight: "10px" }}
                onBlur={handleRecordsPerPageChange}
              />
              <TextField
                label="Search by Full Name"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: "250px" }}
              />
             
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>Total Records: {totalRecords}</div>
              <div>Matching Results: {totalFilteredRecords}</div>
              
            </div>
            <Button
            className="mb-3"
                variant="contained"
                color="success"
                onClick={downloadExcel}
                style={{ height: "40px",display:'flex', float:'inline-end' }}
              >
                Download Excel
              </Button>

            <table className="table">
              <thead className="text-white text-center bg-dark" style={{ backgroundColor: "#28a6a5" }}>
                <tr>
                  <th>S.No</th>
                  <th>Full Name</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Branch Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{indexOfFirstEmployee + index + 1}</td>
                    <td>
                      <ul style={{ listStyle: "none" }}>
                        <li><span className="fw-bold">Full Name: </span>{emp.fullName}</li>
                        <li><span className="fw-bold">Email: </span>{emp.email}</li>
                        <li><span className="fw-bold">Mobile: </span>{emp.mobile}</li>
                      </ul>
                    </td>
                    <td>{emp.address}</td>
                    <td className="fw-bold" style={{ color: emp.isActive ? "green" : "red" }}>
                      {emp.isActive ? "Active" : "InActive"}
                    </td>
                    <td>{emp.branchName}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleViewDetails(emp.id)}
                        style={{ color: "white" }}
                      >
                        <VisibilityIcon color="white" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              marginRight: "100px",
            }}
          >
            {Array.from(
              { length: Math.ceil(totalFilteredRecords / recordsPerPage) },
              (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "contained" : "outlined"}
                  color={currentPage === index + 1 ? "primary" : "inherit"}
                  onClick={() => handlePageChange(index + 1)}
                  sx={{
                    margin: "0 5px",
                    backgroundColor: currentPage === index + 1 ? "darkslategrey" : "transparent",
                    color: currentPage === index + 1 ? "white" : "darkslategrey",
                    "&:hover": {
                      backgroundColor: currentPage === index + 1 ? "darkslategrey" : "lightgrey",
                    },
                  }}
                >
                  {index + 1}
                </Button>
              )
            )}
          </div>
        </>
      )}
    </Base>
  );
};

export default ListEmployees;
