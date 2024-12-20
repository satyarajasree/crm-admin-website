import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for getting the holiday ID
import useAxios from "../auth/useAxios";
import {API_BASE_URL} from "../auth/Api"

export const EditHoliday = () => {
  const { id } = useParams(); // Get the holiday ID from the URL
  const [holidayDate, setHolidayDate] = useState("");
  const [reasonForHoliday, setReasonForHoliday] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const api = useAxios()

  useEffect(() => {
    // Fetch the existing holiday data and department list
    const fetchHolidayData = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/get-holiday/${id}`);
        const holidayData = response.data;
        setHolidayDate(holidayData.holidayDate); // Assuming holidayDate is in YYYY-MM-DD format
        setReasonForHoliday(holidayData.reasonForHoliday);
        setDepartmentId(holidayData.departmentId); // Assuming departmentId is provided in holidayData
      } catch (error) {
        console.error("Error fetching holiday data:", error);
        Swal.fire({
          title: "Error!",
          text: "Unable to fetch holiday data.",
          icon: "error",
        });
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchHolidayData();
    fetchDepartments();
    
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const holidayData = {
      holidayDate,
      reasonForHoliday,
      departmentId,
    };

    console.log("Submitted Data:", holidayData);

    try {
      const response = await api.put(
        `${API_BASE_URL}/crm/admin/holiday/${id}`, 
        holidayData
      );

      setHolidayDate("");
      setReasonForHoliday("");
      setDepartmentId("");
      navigate(`/list-holidays?highlighted=${id}`);
      Swal.fire({
        title: `Holiday updated to date ${holidayDate}`,
        text: `and the reason is ${reasonForHoliday}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating holiday:", error);
      Swal.fire({
        title: "Error!",
        text: "Unable to update holiday.",
        icon: "error",
      });
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
            href="/list-holidays"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Holidays
          </Link>
          <Link underline="hover" key="2" color="inherit" href={`/edit-holiday/${id}`} sx={{ color: "darkslategrey", fontWeight: "bold" }}>
            Edit Holiday
          </Link>
        </Breadcrumbs>
      </div>
      <div className="pt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px " }}>
            <div className="row pb-3">
              
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="holidayDate"
                  className="col-sm-2 col-form-label fw-bold"
                >
                  Date*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="date"
                  id="holidayDate"
                  value={holidayDate}
                  className="form-control"
                  onChange={(e) => setHolidayDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="reasonForHoliday"
                  className="col-sm-2 col-form-label fw-bold"
                >
                  Reason*
                </label>
              </div>

              <div className="col-sm-8">
                <input
                  type="text"
                  id="reasonForHoliday"
                  value={reasonForHoliday}
                  className="form-control"
                  onChange={(e) => setReasonForHoliday(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Department Selection */}
            <div className="row pb-3 mt-3">
             
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="departmentId"
                  className="col-sm-5 col-form-label fw-bold text-end"
                >
                  Department*
                </label>
              </div>
              <div className="col-sm-8">
                <select
                  id="departmentId"
                  name="departmentId"
                  value={departmentId}
                  className="form-control"
                  onChange={(e) => setDepartmentId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "darkslategray",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
