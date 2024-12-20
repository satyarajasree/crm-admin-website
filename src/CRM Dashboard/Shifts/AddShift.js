import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress";  // Import CircularProgress

export const AddShift = () => {
  const [formData, setFormData] = useState({
    shiftName: "",
    startTime: { hour: "12", minute: "00", period: "AM" },
    endTime: { hour: "12", minute: "00", period: "AM" },
  });
  const [loading, setLoading] = useState(false);  // Add loading state

  const api = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state normally for the form input
    if (name.startsWith("startTime") || name.startsWith("endTime")) {
      const timeType = name.split(".")[1]; // either "hour", "minute", or "period"
      const timeCategory = name.split(".")[0]; // either "startTime" or "endTime"
      setFormData((prevData) => ({
        ...prevData,
        [timeCategory]: { ...prevData[timeCategory], [timeType]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const formatTime = (time) => {
    return `${time.hour}:${time.minute} ${time.period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartTime = `${formData.startTime.hour}:${formData.startTime.minute} ${formData.startTime.period}`;
    const formattedEndTime = `${formData.endTime.hour}:${formData.endTime.minute} ${formData.endTime.period}`;

    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await api.post(`${API_BASE_URL}/crm/admin/post-shift`, {
        ...formData,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });

      // Reset form data
      setFormData({
        shiftName: "",
        startTime: { hour: "12", minute: "00", period: "AM" },
        endTime: { hour: "12", minute: "00", period: "AM" },
      });
      setLoading(false); // Stop loading after response

      Swal.fire({
        title: "Shift created successfully!",
        text: `Shift ID: ${response.data.id}`,
        icon: "success",
      });
    } catch (error) {
      setLoading(false); // Stop loading if error occurs
      console.error("Error creating shift:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error creating the shift.",
        icon: "error",
      });
    }
  };

  const renderTimeOptions = (type) => {
    if (type === "hour") {
      return Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
        <option key={hour} value={hour.toString().padStart(2, "0")}>
          {hour}
        </option>
      ));
    } else if (type === "minute") {
      return Array.from({ length: 60 }, (_, i) => (
        <option key={i} value={i.toString().padStart(2, "0")}>
          {i.toString().padStart(2, "0")}
        </option>
      ));
    } else if (type === "period") {
      return (
        <>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </>
      );
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
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
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
            href="/add-shift"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Add Shift
          </Link>
        </Breadcrumbs>
      </div>

      <div className="container" style={{ width: "70%" }}>
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Add Shift
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Shift Name */}
          <div className="form-group mb-3">
            <label htmlFor="shiftName">Shift Name*</label>
            <input
              type="text"
              id="shiftName"
              name="shiftName"
              value={formData.shiftName}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* Start Time */}
          <div className="form-group mb-3">
            <label htmlFor="startTime">Start Time*</label>
            <div className="d-flex">
              <select
                name="startTime.hour"
                value={formData.startTime.hour}
                className="form-control me-2"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("hour")}
              </select>
              <select
                name="startTime.minute"
                value={formData.startTime.minute}
                className="form-control me-2"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("minute")}
              </select>
              <select
                name="startTime.period"
                value={formData.startTime.period}
                className="form-control"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("period")}
              </select>
            </div>
            <small className="form-text text-muted">
              Selected Start Time: {formatTime(formData.startTime)}
            </small>
          </div>

          {/* End Time */}
          <div className="form-group mb-3">
            <label htmlFor="endTime">End Time*</label>
            <div className="d-flex">
              <select
                name="endTime.hour"
                value={formData.endTime.hour}
                className="form-control me-2"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("hour")}
              </select>
              <select
                name="endTime.minute"
                value={formData.endTime.minute}
                className="form-control me-2"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("minute")}
              </select>
              <select
                name="endTime.period"
                value={formData.endTime.period}
                className="form-control"
                onChange={handleChange}
                required
              >
                {renderTimeOptions("period")}
              </select>
            </div>
            <small className="form-text text-muted">
              Selected End Time: {formatTime(formData.endTime)}
            </small>
          </div>

          {/* Submit Button */}
          <div className="form-group mb-3" style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Create Shift"
              )}
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
