import React, { useEffect, useState } from "react";
import { Base } from "./components/Base";
import { Breadcrumbs, Paper, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { FaUsers,FaUsersSlash } from "react-icons/fa";
import "./styles/Dashboard.css";
import { Col, Row } from "react-bootstrap";
import useAxios from "./auth/useAxios";

export const CrmDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("https://crm-java.onrender.com/crm/admin/crm/employees");
        const employeesWithStatus = response.data.map((emp) => ({
          ...emp,
          isActive: emp.active, // Map `active` to `isActive`
        }));

        setEmployees(employeesWithStatus);
        setTotalRecords(employeesWithStatus.length);

        // Count active and inactive employees
        const { active, inactive } = employeesWithStatus.reduce(
          (counts, emp) => {
            if (emp.isActive) {
              counts.active += 1;
            } else {
              counts.inactive += 1;
            }
            return counts;
          },
          { active: 0, inactive: 0 }
        );

        setActiveCount(active);
        setInactiveCount(inactive);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
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
          <Link underline="hover" key="1" color="inherit" href="/">
            Home
          </Link>
          ,
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Dashboard
          </Link>
        </Breadcrumbs>
      </div>

      <div>
        <h1
          className="text-center fw-bold"
          style={{ fontFamily: "Georgia", color: "#0DD354" }}
        >
          Welcome to CRM Admin dashboard
        </h1>
      </div>

      <div className="container mt-5">
        <Row>
          <Col md={4}>
            <Paper
              variant="outlined"
              
            >
              <div className="icon-container">
                <FaUsers size={200} />
              </div>
              <Typography className="text-center fw-bold pb-2" variant="h5">
              {totalRecords}
              </Typography>
              <Typography className="text-center fw-bold pb-2" variant="h5">
                Total Employees
              </Typography>
            </Paper>
          </Col>

          <Col md={4}>
            <Paper
              variant="outlined"
              
            >
              <div className="icon-container">
                <FaUsers size={200} color="#7CB9E8"/>
              </div>
              <Typography className="text-center fw-bold pb-2" variant="h5">
                {activeCount}
              </Typography>
              <Typography className="text-center fw-bold pb-2" variant="h5">
                Active Employees
              </Typography>
            </Paper>
          </Col>

          <Col md={4}>
            <Paper
              variant="outlined"
              
            >
              <div className="icon-container">
                <FaUsersSlash size={200} />
              </div>
              <Typography className="text-center fw-bold pb-2" variant="h5">
                {inactiveCount}
              </Typography>
              <Typography className="text-center fw-bold pb-2" variant="h5">
                Inactive Employees
              </Typography>
            </Paper>
          </Col>
        </Row>
      </div>
    </Base>
  );
};
