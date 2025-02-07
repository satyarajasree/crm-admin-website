import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link, TextField, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/table.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useAxios from "../auth/useAxios";
import {API_BASE_URL} from "../auth/Api"

export const ListBranch = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios()

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_BASE_URL}/crm/admin/branches`);
        setHolidays(response.data);
        setFilteredHolidays(response.data);
      } catch (err) {
        setError("Error fetching holiday data");
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedHolidays = filteredHolidays.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Branch?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await api.delete(`${API_BASE_URL}/crm/admin/delete-branch/${id}`);
        setHolidays(holidays.filter((holiday) => holiday.id !== id));
        setFilteredHolidays(
          filteredHolidays.filter((holiday) => holiday.id !== id)
        );
        Swal.fire("Deleted!", "The Branch has been deleted.", "success");
      } catch (err) {
        Swal.fire(
          "Error!",
          "There was an error deleting the Department.",
          "error"
        );
      }
    }
  };

  const navigate = useNavigate();
  const handleEditHoliday = (id) => {
    navigate(`/edit-branch/${id}`); // Redirect to the employee detail page with the ID
  };

 

  return (
    <Base>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
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
              <Link
                underline="none"
                key="2"
                color="inherit"
                href="/list-branch"
                sx={{ color: "darkslategrey", fontWeight: "bold" }}
              >
                Branches
              </Link>
              
            </Breadcrumbs>
          </div>

          <h2
            className="text-center fw-bold"
            style={{ color: "darkslategrey" }}
          >
            Branch List
          </h2>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <div className="container">
            {/* Filters */}
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
                style={{ width: "150px" }}
              />
            </div>

            {/* Holiday Table */}
            <table className="table">
              <thead
                className="text-white text-center"
                style={{ backgroundColor: "darkslategrey" }}
              >
                <tr>
                  <th>S.No</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHolidays.map((holiday, index) => (
                  <tr key={holiday.id}>
                    <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                    <td>{holiday.branchName}</td>
                    <td>{holiday.branchDescription}</td>
                   
                    <td>
                      <Button
                        color="primary"
                        onClick={() => handleEditHoliday(holiday.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(holiday.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                marginRight: "100px",
              }}
            >
              {Array.from(
                { length: Math.ceil(filteredHolidays.length / recordsPerPage) },
                (_, index) => (
                  <Button
                    key={index + 1}
                    variant={
                      currentPage === index + 1 ? "contained" : "outlined"
                    }
                    color={currentPage === index + 1 ? "primary" : "inherit"}
                    onClick={() => setCurrentPage(index + 1)}
                    sx={{
                      margin: "0 5px",
                      backgroundColor:
                        currentPage === index + 1
                          ? "darkslategrey"
                          : "transparent",
                      color:
                        currentPage === index + 1 ? "white" : "darkslategrey",
                      "&:hover": {
                        backgroundColor:
                          currentPage === index + 1
                            ? "darkslategrey"
                            : "lightgrey",
                      },
                    }}
                  >
                    {index + 1}
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </Base>
  );
};
