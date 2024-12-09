import React from "react";
import { Base } from "../components/Base";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const ChangePassword = () => {
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
            href=""
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Employees
          </Link>
          <Link underline="hover" key="3" color="inherit" href="add-employee">
            List Employees
          </Link>
        </Breadcrumbs>
      </div>
      <div className="container mt-2">
       

        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Change Password
        </h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
      </div>
    </Base>
  );
};
