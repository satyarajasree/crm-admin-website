import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Button, Link, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/table.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useAxios from "../auth/useAxios";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../auth/Api";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(""); // New state to track selected branch
  const [branches, setBranches] = useState([]); // State to hold all branch names
  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/crm/employees`);
        const employeesWithStatus = response.data.map((emp) => ({
          ...emp,
          isActive: emp.active, // Map `active` to `isActive`
        }));
        setEmployees(employeesWithStatus);
        setTotalRecords(employeesWithStatus.length);

        // Collect unique branches from employees
        const uniqueBranches = [
          ...new Set(employeesWithStatus.map((emp) => emp.branch.branchName)),
        ];
        setBranches(uniqueBranches);
       
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
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

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = employees
    .filter((emp) =>
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((emp) => (selectedBranch ? emp.branch.branchName === selectedBranch : true));

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
          <div className="pt-3 mt-5" style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link underline="hover" key="1" color="inherit" href="/dashboard" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <FormControl size="small" style={{ width: "150px", marginRight: "10px" }}>
                <InputLabel>Records per page</InputLabel>
                <Select value={recordsPerPage} onChange={handleRecordsPerPageChange} label="Records per page">
                  {[5, 10, 15, 20, 25].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Search by Full Name"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: "250px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>Total Records: {totalRecords}</div>
              <div>Matching Results: {totalFilteredRecords}</div>
            </div>

            {/* Branch filter dropdown */}
            <FormControl size="small" style={{ width: "150px", marginBottom: "20px" }}>
              <InputLabel>Filter by Branch</InputLabel>
              <Select value={selectedBranch} onChange={handleBranchChange} label="Filter by Branch">
                <MenuItem value="">All Branches</MenuItem>
                {branches.map((branch, index) => (
                  <MenuItem key={index} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              className="mb-3"
              variant="contained"
              color="success"
              onClick={downloadExcel}
              style={{ height: "40px", display: "flex", float: "inline-end" }}
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
                    <td>{emp.branch.branchName}</td>
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

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", marginRight: "100px" }}>
            <FormControl size="small" style={{ width: "150px" }}>
              <InputLabel>Page</InputLabel>
              <Select value={currentPage} onChange={handlePageChange} label="Page">
                {Array.from({ length: Math.ceil(totalFilteredRecords / recordsPerPage) }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </>
      )}
    </Base>
  );
};

export default ListEmployees;
