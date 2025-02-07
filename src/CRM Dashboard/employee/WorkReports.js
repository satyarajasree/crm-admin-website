import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base } from "../components/Base";
import { Table, Spinner, Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from "../auth/Api";
import useAxios from "../auth/useAxios";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const WorkReports = () => {
  const [workReports, setWorkReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lon: null,
  });
  const api = useAxios();

  useEffect(() => {
    const fetchWorkReports = async () => {
      try {
        const response = await api.get(
          `${API_BASE_URL}/crm/admin/work-reports`
        );
        setWorkReports(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching work reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkReports();
  }, []);

  const handleViewLocation = (lat, lon) => {
    setSelectedLocation({ lat, lon });
    setShowModal(true);
  };

  return (
    <Base>
      <div className="container p-5">
        {/* Breadcrumbs */}
        <div
          className="pt-3"
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
              href="/work-reports"
              sx={{ color: "darkslategrey", fontWeight: "bold" }}
            >
              Work Reports
            </Link>
          </Breadcrumbs>
        </div>

        {/* Heading */}
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Work Reports
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>

                <th>Employee</th>
                <th>Date</th>
                <th>Name of Person</th>
                <th>Project Name</th>
                <th>Remarks</th>
                <th>Work Report</th>
                <th>Reminder Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {workReports.length > 0 ? (
                workReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.crmEmployee.fullName}</td>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>{report.nameOfPerson}</td>
                    <td>{report.projectName}</td>
                    <td>{report.remarks}</td>
                    <td>{report.workReport}</td>
                    <td>
                      {report.reminderDate
                        ? new Date(report.reminderDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {report.latitude && report.longitude ? (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleViewLocation(
                                report.latitude,
                                report.longitude
                              )
                            }
                          >
                            View Location
                          </Button>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No work reports available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        {/* Location Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Work Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLocation.lat && selectedLocation.lon ? (
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  selectedLocation.lon - 0.005
                },${selectedLocation.lat - 0.005},${
                  selectedLocation.lon + 0.005
                },${selectedLocation.lat + 0.005}&layer=mapnik&marker=${
                  selectedLocation.lat
                },${selectedLocation.lon}`}
              ></iframe>
            ) : (
              <p>Location data is not available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Base>
  );
};

export default WorkReports;
