import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";

export const AddHolidays = () => {
  const [holidayDate, setHolidayDate] = useState("");
  const [reasonForHoliday, setReasonForHoliday] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const api = useAxios()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "https://crm-java.onrender.com/crm/admin/post-holiday",
        null,
        {
          params: {
            holidayDate,
            reasonForHoliday,
            departmentId,
          },
        }
      );

      setHolidayDate("");
      setReasonForHoliday("");
      setDepartmentId("");
      console.log(response.data);
      Swal.fire({
        title: `Holiday set to date ${holidayDate}`,
        text: `On the Occasion of ${reasonForHoliday}`,
      });
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("https://crm-java.onrender.com/crm/admin/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
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
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          
          <Link underline="hover" key="3" color="inherit" href="/add-holiday" sx={{ color: "darkslategrey", fontWeight: "bold" }}>
            Add Holiday
          </Link>
        </Breadcrumbs>
      </div>
      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Add Holiday
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
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
            <div className="row mt-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="departmentId"
                  className="col-sm-2 col-form-label fw-bold text-end"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};