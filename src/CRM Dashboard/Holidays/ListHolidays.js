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

export const ListHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightedHolidayId, setHighlightedHolidayId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const api = useAxios()

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_BASE_URL}/crm/admin/holidays`);
        setHolidays(response.data);
        setFilteredHolidays(response.data);

        // Extract highlighted holiday ID from the URL query parameter
        const params = new URLSearchParams(location.search);
        const highlighted = params.get("highlighted");
        if (highlighted) setHighlightedHolidayId(Number(highlighted));
      } catch (err) {
        setError("Error fetching holiday data");
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [location]);

  const handleDelete = async (holidayId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this holiday?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await api.delete(`${API_BASE_URL}/crm/admin/holiday/${holidayId}`);
        setHolidays(holidays.filter((holiday) => holiday.id !== holidayId));
        setFilteredHolidays(
          filteredHolidays.filter((holiday) => holiday.id !== holidayId)
        );
        Swal.fire("Deleted!", "The holiday has been deleted.", "success");
      } catch (err) {
        Swal.fire(
          "Error!",
          "There was an error deleting the holiday.",
          "error"
        );
      }
    }
  };

  const handleEditHoliday = (id) => {
    navigate(`/edit-holiday/${id}`);
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
                href="/list-holidays"
                sx={{ color: "darkslategrey", fontWeight: "bold" }}
              >
                Holidays
              </Link>
              
            </Breadcrumbs>
          </div>

          
          {/* Breadcrumbs and table header */}
          <h2
            className="text-center fw-bold"
            style={{ color: "darkslategrey" }}
          >
            Holidays List
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <div className="container">
            <TextField
              type="number"
              label="Records per page"
              variant="outlined"
              size="small"
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              style={{ width: "150px", marginBottom: "10px" }}
            />

            <table className="table">
              <thead
                className="text-white text-center"
                style={{ backgroundColor: "darkslategrey" }}
              >
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHolidays
                  .slice(
                    (currentPage - 1) * recordsPerPage,
                    currentPage * recordsPerPage
                  )
                  .map((holiday, index) => (
                    <tr
                      key={holiday.id}
                      style={{
                        backgroundColor:
                          holiday.id === highlightedHolidayId
                            ? "lightyellow"
                            : "transparent",
                      }}
                    >
                      <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                      <td>{holiday.holidayDate}</td>
                      <td>{holiday.reasonForHoliday}</td>
                      <td>{holiday.departments.department}</td>
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

            {/* Pagination */}
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
