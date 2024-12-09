import React, { useState, useEffect } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useAxios from "../auth/useAxios";

export const EmployeePunchActivity = () => {
  const [punch, setPunch] = useState([]);
  const api = useAxios();

  const fetchEmployee = async () => {
    try {
      const response = await api.get("https://crm-java.onrender.com/crm/admin/punch/all");
      setPunch(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

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
              href=""
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Employees
            </Link>
            <Link underline="hover" color="inherit" href="add-employee">
              List Employees
            </Link>
          </Breadcrumbs>
        </div>

        <h2
          className="text-center fw-bold pt-3"
          style={{ color: "darkslategrey" }}
        >
          Employee Punch Activities
        </h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>

        <table className="table table-bordered m-5" style={{width:"90%"}}>
          <thead
            className="text-white text-center"
            style={{ backgroundColor: "#2C2F33" }}
          >
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Punch-in Time</th>
              <th>Punch-in Image</th>
              <th>Punch-out Time</th>
              <th>Punch-out Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {punch.length > 0 ? (
              punch.map((p, index) => (
                <tr key={p.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{p.crmEmployee.fullName || "N/A"}</td>
                  <td>{p.date}</td>
                  <td>{p.timeOfPunchIn || "N/A"}</td>
                  <td>
                    {p.punchInImage ? (
                      <img
                        src={`data:image/jpeg;base64,${p.punchInImage}`}
                        alt="Punch-in"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{p.timeOfPunchOut || "N/A"}</td>
                  <td>
                    {p.punchOutImage ? (
                      <img
                        src={`data:image/jpeg;base64,${p.punchOutImage}`}
                        alt="Punch-out"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => console.log("Delete action")}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Punch Activities Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Base>
    </div>
  );
};
