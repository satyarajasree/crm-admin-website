import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for getting the holiday ID
import useAxios from "../auth/useAxios";

export const UpdateDepartments = () => {
  const { id } = useParams(); // Get the holiday ID from the URL
  
  const [department, setDepartment] = useState([]);
  const [departmentDescription, setDepartmentDescription] = useState([]);
  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    // Fetch the existing holiday data and department list
    const fetchHolidayData = async () => {
      try {
        const response = await api.get(`https://crm-java.onrender.com/crm/admin/departments/${id}`);
        const holidayData = response.data;
        setDepartment(holidayData.department); // Assuming holidayDate is in YYYY-MM-DD format
        setDepartmentDescription(holidayData.departmentDescription);
      } catch (error) {
        console.error("Error fetching holiday data:", error);
        Swal.fire({
          title: "Error!",
          text: "Unable to fetch holiday data.",
          icon: "error",
        });
      }
    };

   

    fetchHolidayData();
   
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const holidayData = {
      department,
      departmentDescription
    };

    console.log("Submitted Data:", holidayData);

    try {
      const response = await api.put(
        `https://crm-java.onrender.com/crm/admin/departments/${id}`, // Assuming an update endpoint exists
        holidayData
      );

      setDepartment("")
      setDepartmentDescription("")
      navigate("/list-departments");
      Swal.fire({
        title: ` updated department to ${department}`,
        text: ` ${departmentDescription}`,
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
            href="/list-departments"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Departments
          </Link>
          <Link underline="hover" key="2" color="inherit" href={`/update-departments/${id}`} sx={{ color: "darkslategrey", fontWeight: "bold" }}>
            Edit Department
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
                  Reason*
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
              Update
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};
