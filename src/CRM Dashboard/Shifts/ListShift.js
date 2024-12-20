import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link, TextField, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/table.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../auth/useAxios";
import {API_BASE_URL} from "../auth/Api"

export const ListShift = () => {
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const api = useAxios();

  // Retrieve the highlighted shift ID from the URL and convert it to a number
  const params = new URLSearchParams(location.search);
  const highlightedId = Number(params.get("highlighted"));

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_BASE_URL}/crm/admin/shifts`);
        setShifts(response.data);
        setFilteredShifts(response.data);
      } catch (err) {
        setError("Error fetching shift data");
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
    
  }, []);

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedShifts = filteredShifts.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleDelete = async (shiftId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this shift?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await api.delete(`${API_BASE_URL}/crm/admin/shift/${shiftId}`);
        setShifts(shifts.filter((shift) => shift.id !== shiftId));
        setFilteredShifts(filteredShifts.filter((shift) => shift.id !== shiftId));
        Swal.fire("Deleted!", "The shift has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "There was an error deleting the shift.", "error");
      }
    }
  };

  const navigate = useNavigate();
  const handleEditShift = (id) => {
    navigate(`/edit-shift/${id}`);
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const formattedHours = parsedHours % 12 || 12;
    
    return `${formattedHours}:${minutes} `;
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <ClipLoader color="darkslategrey" size={50} />
      </div>
    );
  if (error) return <div>{error}</div>;

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
          <Link underline="hover" key="1" color="inherit" href="/dashboard" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
            Home
          </Link>
          <Link underline="none" key="2" color="inherit" href="/list-shift" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
            Shifts
          </Link>
          
        </Breadcrumbs>
      </div>

      <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>Shifts List</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "90%" }} />
      </div>

      <div className="container">
        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <TextField
            type="number"
            label="Records per page"
            variant="outlined"
            size="small"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            style={{ width: "150px" }}
          />
        </div>

        {/* Shift Table */}
        <table className="table">
          <thead className="text-white text-center" style={{ backgroundColor: "darkslategrey" }}>
            <tr>
              <th>S.No</th>
              <th>Shift Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedShifts.map((shift, index) => (
              <tr
                key={shift.id}
                style={{
                  backgroundColor: shift.id === highlightedId ? "lightyellow" : "inherit",
                }}
              >
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>{shift.shiftName}</td>
                <td>{convertTo12HourFormat(shift.startTime)}</td>
                <td>{convertTo12HourFormat(shift.endTime)}</td>
                <td>
                  <Button color="primary" onClick={() => handleEditShift(shift.id)}>
                    <EditIcon />
                  </Button>
                  <Button color="error" onClick={() => handleDelete(shift.id)}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", marginRight: "100px" }}>
          {Array.from({ length: Math.ceil(filteredShifts.length / recordsPerPage) }, (_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              color={currentPage === index + 1 ? "primary" : "inherit"}
              onClick={() => setCurrentPage(index + 1)}
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
          ))}
        </div>
      </div>
    </Base>
  );
};
