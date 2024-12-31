import React, { useEffect, useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for getting the punch ID
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";


export const UpdatePunchActivity = () => {
  const { id } = useParams(); // Get the punch ID from the URL
  const [timeOfPunchOut, setTimeOfPunchOut] = useState("");
  const [punchInImage, setPunchInImage] = useState(null);
  const [punchOutImage, setPunchOutImage] = useState(null);
  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    // Fetch the existing punch activity data
    const fetchPunchData = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/punch/${id}`);
        const punchData = response.data;
        setTimeOfPunchOut(punchData.timeOfPunchOut || "");
        setPunchInImage(null); // Reset file inputs
        setPunchOutImage(null);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching punch activity data:", error);
        Swal.fire({
          title: "Error!",
          text: "Unable to fetch punch activity data.",
          icon: "error",
        });
      }
    };

    fetchPunchData();
  }, [id, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("timeOfPunchOut", timeOfPunchOut);
    if (punchInImage) formData.append("punchInImage", punchInImage);
    if (punchOutImage) formData.append("punchOutImage", punchOutImage);

    try {
      const response = await api.put(
        `${API_BASE_URL}/punch/update/${id}`, // Assuming an update endpoint exists
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTimeOfPunchOut("");
      setPunchInImage(null);
      setPunchOutImage(null);
      navigate("/list-punch-activities");
      Swal.fire({
        title: "Success!",
        text: "Punch activity updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating punch activity:", error);
      Swal.fire({
        title: "Error!",
        text: "Unable to update punch activity.",
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
            color="inherit"
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            underline="none"
            color="inherit"
            href="/list-punch-activities"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Punch Activities
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/update-punch-activity/${id}`}
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Edit Punch Activity
          </Link>
        </Breadcrumbs>
      </div>
      <div className="pt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px" }}>
            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="timeOfPunchOut"
                  className="col-sm-2 col-form-label fw-bold"
                >
                  Punch Out Time*
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="timeOfPunchOut"
                  value={timeOfPunchOut}
                  className="form-control"
                  onChange={(e) => setTimeOfPunchOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="punchInImage"
                  className="col-sm-2 col-form-label fw-bold"
                >
                  Punch In Image
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="file"
                  id="punchInImage"
                  className="form-control"
                  onChange={(e) => setPunchInImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row pb-3">
              <div
                className="col-sm-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <label
                  htmlFor="punchOutImage"
                  className="col-sm-2 col-form-label fw-bold"
                >
                  Punch Out Image
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="file"
                  id="punchOutImage"
                  className="form-control"
                  onChange={(e) => setPunchOutImage(e.target.files[0])}
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
