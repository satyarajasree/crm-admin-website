import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    location: "",
    designation: "",
    address: "",
    username: "",
    password: "",
    employeeReferenceId: "",
    managerReferenceId: "",
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  // Fetch existing employees to select a manager
  const fetchManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/main/admin/list-employee"
      );
      setManagers(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append(
      "employee",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (documentFile) {
      data.append("documentFile", documentFile);
    }
    if (formData.managerReferenceId) {
      data.append("managerReferenceId", formData.managerReferenceId);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/main/admin/add-employee",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess("Employee added successfully!");
      setFormData({
        fullName: "",
        dateOfBirth: "",
        email: "",
        mobile: "",
        location: "",
        designation: "",
        address: "",
        username: "",
        password: "",
        employeeReferenceId: "",
        managerReferenceId: "",
      });
      setDocumentFile(null);
      fetchManagers();
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message || "Unknown error occurred";
        const statusCode = err.response.status;

        if (statusCode === 400) {
          setError(`Error: ${errorMessage}`); // Displaying the error message
        } else if (statusCode === 409) {
          setError(`Conflict: ${errorMessage}`); // Handle conflict (e.g., email already exists)
        } else if (statusCode === 500) {
          setError(`Server Error: ${errorMessage}`);
        } else {
          setError(`Error: ${errorMessage}`);
        }
      } else {
        setError("Network error. Please check your internet connection.");
      }
      console.error("Error adding employee:", err);
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2 w-full"
        />

        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Designation</option>
          <option value="GM">General Manager (GM)</option>
          <option value="AGM">Assistant General Manager (AGM)</option>
          <option value="DM">Deputy Manager (DM)</option>
          <option value="DO">Divisional Officer (DO)</option>
          <option value="MO">Marketing Officer (MO)</option>
        </select>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="employeeReferenceId"
          value={formData.employeeReferenceId}
          onChange={handleChange}
          placeholder="Employee Reference ID"
          required
          className="border p-2 w-full"
        />

        <select
          name="managerReferenceId"
          value={formData.managerReferenceId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Manager (Optional)</option>
          {managers.length > 0 ? (
            managers.map((manager) => (
              <option
                key={manager.employeeReferenceId}
                value={manager.employeeReferenceId}
              >
                {manager.fullName} ({manager.designation})
              </option>
            ))
          ) : (
            <option disabled>No managers available</option>
          )}
        </select>

        {/* Document Upload */}
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
