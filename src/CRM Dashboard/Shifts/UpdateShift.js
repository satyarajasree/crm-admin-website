import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";

export const UpdateShift = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const [formData, setFormData] = useState({
    shiftName: "",
    startTime: { hour: "12", minute: "00", period: "AM" },
    endTime: { hour: "12", minute: "00", period: "AM" },
  });

  useEffect(() => {
    const fetchShiftDetails = async () => {
      try {
        const response = await api.get(
          `${API_BASE_URL}/crm/admin/shifts/${id}`
        );
        const { shiftName } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          shiftName,
        }));
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch shift details.",
          icon: "error",
        });
      }
    };

    fetchShiftDetails();
  }, [id, api]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [timeField, timeType] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [timeField]: {
          ...prevData[timeField],
          [timeType]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartTime = `${formData.startTime.hour}:${formData.startTime.minute}:00 ${formData.startTime.period}`;
    const formattedEndTime = `${formData.endTime.hour}:${formData.endTime.minute}:00 ${formData.endTime.period}`;

    try {
      const response = await api.put(`${API_BASE_URL}/crm/admin/shift/${id}`, {
        ...formData,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });

      Swal.fire({
        title: "Shift updated successfully!",
        text: `Shift ID: ${response.data.id}`,
        icon: "success",
      });
      navigate(`/list-shift?highlighted=${id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the shift.",
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
      return Array.from({ length: 60 }, (_, i) => i).map((minute) => (
        <option key={minute} value={minute.toString().padStart(2, "0")}>
          {minute.toString().padStart(2, "0")}
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
            href="/list-shift"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Shifts
          </Link>
          <Link
            underline="hover"
            key="3"
            color="inherit"
            href={`/edit-shift/${id}`}
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Update Shift
          </Link>
        </Breadcrumbs>
      </div>
      <div className="container" style={{ width: "70%" }}>
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Update Shift
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="shiftName">Shift Name*</label>
            <input
              type="text"
              id="shiftName"
              name="shiftName"
              value={formData.shiftName}
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, shiftName: e.target.value })
              }
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
          </div>

          <div
            className="form-group mb-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button type="submit" className="btn btn-dark">
              Update Shift
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
