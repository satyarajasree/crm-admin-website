import React, { useState, useEffect } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link, TextField } from "@mui/material";
import { ClipLoader } from "react-spinners";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import {API_BASE_URL} from "../auth/Api"

export const Enquries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useAxios();


  // Fetch Enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${API_BASE_URL}/crm/admin/enquiries`);
      setEnquiries(response.data);
      setTotalRecords(response.data.length);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Enquiry
  const deleteEnquiry = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await api.delete(`${API_BASE_URL}/crm/admin/enquiry/${id}`);
        Swal.fire("Deleted!", "The enquiry has been deleted.", "success");
        fetchEnquiries(); // Refresh enquiries after deletion
      } catch (error) {
        console.error("Error deleting enquiry:", error);
        Swal.fire("Error", "Failed to delete the enquiry.", "error");
      }
    }
  };

  // Search Filter
  const filteredEnquiries = enquiries.filter((enquiry) =>
    enquiry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEnquiries.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredEnquiries.length / recordsPerPage);

  useEffect(() => {
    fetchEnquiries();
  }, []);

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
            href="/"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            underline="none"
            key="2"
            color="inherit"
            href="/enquries"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Enquiries
          </Link>
          
        </Breadcrumbs>
      </div>

      <div className="container">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Enquiries
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
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
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            style={{ width: "150px", marginRight: "10px" }}
          />
          <TextField
            label="Search by Employee Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div>Matching Results: {filteredEnquiries.length}</div>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ClipLoader color="#2C2F33" size={50} />
          </div>
        ) : (
          <table className="table">
            <thead
              className="text-white text-center"
              style={{ backgroundColor: "#2C2F33" }}
            >
              <tr>
                <th>S.No</th>
                <th>Employee Name</th>
                <th>Title</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((enquiry, index) => (
                <tr key={enquiry.id} className="text-center">
                  <td>{indexOfFirstRecord + index + 1}</td>
                  <td>{enquiry.employeeName || "N/A"}</td>
                  <td>{enquiry.title}</td>
                  <td>{enquiry.message}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEnquiry(enquiry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Enquiries Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-outline-dark btn-sm"
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-outline-dark btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </Base>
  );
};
