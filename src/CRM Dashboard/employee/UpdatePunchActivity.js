import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../auth/Api'; // Adjust this to your API base URL
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../auth/useAxios';
import { Base } from '../components/Base';
import { Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap

const UpdatePunchActivity = () => {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [timeOfPunchIn, setTimeOfPunchIn] = useState('');
  const [timeOfPunchOut, setTimeOfPunchOut] = useState('');
  const [punchInImagePath, setPunchInImagePath] = useState(null); // Store image path
  const [punchOutImagePath, setPunchOutImagePath] = useState(null); // Store image path
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const navigation = useNavigate();

  // Fetch current punch activity data when the component loads
  useEffect(() => {
    const fetchPunchActivity = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/punch/${id}`);
        const { date, timeOfPunchIn, timeOfPunchOut, punchInImagePath, punchOutImagePath } = response.data;
        setDate(date);
        setTimeOfPunchIn(timeOfPunchIn);
        setTimeOfPunchOut(timeOfPunchOut);
        setPunchInImagePath(punchInImagePath); // Set the path for Punch In image
        setPunchOutImagePath(punchOutImagePath); // Set the path for Punch Out image
      } catch (error) {
        console.error('Error fetching punch activity:', error);
      }
    };
    fetchPunchActivity();
  }, [id]);

  // Handle file input change for punch-in or punch-out image
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'punchIn') {
        setPunchInImagePath(file); // Set file for Punch In image
      } else {
        setPunchOutImagePath(file); // Set file for Punch Out image
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('date', date);
    formData.append('timeOfPunchIn', timeOfPunchIn);
    formData.append('timeOfPunchOut', timeOfPunchOut);

    if (punchInImagePath) {
      formData.append('punchInImage', punchInImagePath); // Add Punch In image file to form data
    }

    if (punchOutImagePath) {
      formData.append('punchOutImage', punchOutImagePath); // Add Punch Out image file to form data
    }

    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
      const response = await axios.put(
        `${API_BASE_URL}/crm/admin/punch/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Punch activity updated successfully.');
        navigation('/employees-punch-activity'); 
      } else {
        alert('Failed to update punch activity.');
      }
    } catch (error) {
      console.error('Error updating punch activity:', error);
      alert('Failed to update punch activity.');
    } finally {
      setLoading(false);
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
      <div className="container p-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>
          Update Punch Activity
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time of Punch In</label>
            <input
              type="time"
              className="form-control"
              value={timeOfPunchIn}
              onChange={(e) => setTimeOfPunchIn(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time of Punch Out</label>
            <input
              type="time"
              className="form-control"
              value={timeOfPunchOut}
              onChange={(e) => setTimeOfPunchOut(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Punch In Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'punchIn')}
            />
            {punchInImagePath && typeof punchInImagePath === 'string' && (
              <img src={punchInImagePath} alt="Punch In" className="mt-3" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Select Punch Out Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'punchOut')}
            />
            {punchOutImagePath && typeof punchOutImagePath === 'string' && (
              <img src={punchOutImagePath} alt="Punch Out" className="mt-3" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            )}
          </div>

          <div className="mb-3">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : null}
              {loading ? ' Updating...' : 'Update Punch Activity'}
            </Button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default UpdatePunchActivity;
