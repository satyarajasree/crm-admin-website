import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from '../auth/useAxios';
import {API_BASE_URL} from "../auth/Api"

export const AddDepartments = () => {
  const [department, setDepartment] = useState([]);
  const [departmentDescription, setDepartmentDescription] = useState([]);
  const api = useAxios()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post(
        `${API_BASE_URL}/crm/admin/add-department`,
        {
          department: department, 
          departmentDescription: departmentDescription,
        }, 
        {
          headers: {
            'Content-Type': 'application/json',  // Ensure the content type is set to JSON
          }
        }, [api]
      );
  
      setDepartment(""); 
      setDepartmentDescription("");
      console.log(response.data);
      Swal.fire({
        title: `${department} added successfully`,
        text: `${departmentDescription}`,
      });
    } catch (error) {
      console.error("Error adding department:", error);
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
            href="/add-department"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Add Departments
          </Link>
          
        </Breadcrumbs>
      </div>
      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Add Departments
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
                  Department*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="holidayDate"
                  value={department}
                  className="form-control"
                  onChange={(e) => setDepartment(e.target.value)}
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
                  Description*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="reasonForHoliday"
                  value={departmentDescription}
                  className="form-control"
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  required
                />
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
