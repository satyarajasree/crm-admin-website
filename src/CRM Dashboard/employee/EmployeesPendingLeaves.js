import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import {
  Breadcrumbs,
  Link,
  Modal,
  Button,
  Box,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useAxios from "../auth/useAxios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../auth/Api";
import Select from "react-select";

export const EmployeesPendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null); // Hold selected leave for the popup
  const [newStatus, setNewStatus] = useState(""); // New status to update
  const [open, setOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const api = useAxios();

  const statusOptions = [
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];
  useEffect(() => {
    // Fetch pending leaves when the component mounts
    api
      .get(`${API_BASE_URL}/crm/admin/leaves/PENDING`)
      .then((response) => {
        setLeaves(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching leaves!", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleStatusChange = (leaveId) => {
    if (!newStatus) return;

    console.log("Updating status for leave:", leaveId);

    api
      .put(
        `${API_BASE_URL}/crm/admin/${leaveId}/status?status=${newStatus}`,
        null,
        {
          params: { status: newStatus },
        }
      )
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
              href="/dashboard"
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Home
            </Link>
            <Link
              underline="none"
              color="inherit"
              href="/employees-pending-leaves"
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Employees
            </Link>
          </Breadcrumbs>
        </div>

        <div className="container">
          <h2
            className="text-center fw-bold pt-3"
            style={{ color: "darkslategrey" }}
          >
            Pending Leaves
          </h2>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
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
                            console.log("Selected Leave:", leave); // Log to check
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
          )}
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
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Update Leave Status
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {selectedLeave ? (
              <>
                <Typography mb={2}>
                  <strong>Leave ID:</strong> {selectedLeave.id}
                </Typography>
                <Typography mb={2}>
                  <strong>Employee:</strong> {selectedLeave.employeeName}
                </Typography>
                <FormControl fullWidth>
                  
                  <Select
                    options={statusOptions}
                    value={statusOptions.find(
                      (option) => option.value === newStatus
                    )}
                    onChange={(selectedOption) =>
                      setNewStatus(selectedOption.value)
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "8px",
                        borderColor: "#ccc",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#888",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#1976d2" : "#fff",
                        color: state.isSelected ? "#fff" : "#000",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }),
                    }}
                  />
                </FormControl>
              </>
            ) : (
              <Typography color="error" textAlign="center">
                No leave selected.
              </Typography>
            )}
          </Box>

          {/* Divider */}
          <Divider />

          {/* Footer Actions */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "background.default",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                selectedLeave && handleStatusChange(selectedLeave.id)
              }
              disabled={!selectedLeave || !newStatus}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
