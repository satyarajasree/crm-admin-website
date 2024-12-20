import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import {
  Breadcrumbs,
  Link,
  Modal,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useAxios from "../auth/useAxios";
import Swal from "sweetalert2";
import {API_BASE_URL} from "../auth/Api"

export const EmployeeRejectedLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null); // Hold selected leave for the popup
  const [newStatus, setNewStatus] = useState(""); // New status to update
  const [open, setOpen] = useState(false); // Modal state
  const api = useAxios();

  useEffect(() => {
    // Fetch pending leaves when the component mounts
    api
      .get(`${API_BASE_URL}/crm/admin/leaves/REJECTED`)
      .then((response) => setLeaves(response.data))
      .catch((error) => console.error("Error fetching leaves!", error));
  }, []);

  const handleStatusChange = (leaveId) => {
    if (!newStatus) return;

    console.log("Updating status for leave:", leaveId);

    api
      .put(`${API_BASE_URL}0/crm/admin/${leaveId}/status?status=${newStatus}`, null, {
        params: { status: newStatus },
      })
      .then(() => {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === leaveId ? { ...leave, leavesEnum: newStatus } : leave
          )
        );
        setOpen(false);
        Swal.fire("Success!", `Status updated to ${newStatus}.`, "success");
      })
      .catch((error) => {
        console.error("Error updating status!", error);
        Swal.fire("Error!", "Failed to update status.", "error");
      });
  };

  return (
    <div>
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
              color="inherit"
              href="/"
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Home
            </Link>
            <Link
              underline="none"
              color="inherit"
              href="employees"
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Employees
            </Link>
          </Breadcrumbs>
        </div>

        <div className="container">
          <h2 className="text-center fw-bold pt-3" style={{ color: "darkslategrey" }}>
            Pending Leaves
          </h2>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <table className="table">
            <thead
              className="text-white text-center"
              style={{ backgroundColor: "#2C2F33" }}
            >
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Leave Type</th>
                <th>leave day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave.id}>
                    <td>{index + 1}</td>
                    <td>{leave.employeeName}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.leaveDay}</td>
                    <td>{leave.leavesEnum}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          console.log('Selected Leave:', leave); // Log to check
                          setSelectedLeave(leave); // Set selected leave for status change
                          setNewStatus(""); // Reset status
                          setOpen(true); // Open modal
                        }}
                      >
                        Change Status
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No pending leaves found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Base>

      {/* Modal for changing status */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Change Leave Status
          </Typography>
          {selectedLeave && (
            <>
              <Typography mb={2}>
                <strong>Leave ID:</strong> {selectedLeave.id} {/* Display Leave ID */}
              </Typography>
              <Typography mb={2}>
                <strong>Employee:</strong> {selectedLeave.employeeName}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="APPROVED">Approved</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </FormControl>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleStatusChange(selectedLeave.id)} // Pass the selected leave's ID
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
