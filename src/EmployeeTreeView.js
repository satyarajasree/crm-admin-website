import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/main/admin/list-employee");
        setEmployees(response.data); // Assuming the response data is the array of employees
      } catch (err) {
        setError("Error fetching employee data");
      }
    };

    fetchEmployees();
  }, []);

  // Function to get the manager's name in the hierarchy
  const getManagerName = (manager) => {
    if (!manager) return "No Manager";
    return `${manager.fullName} (${manager.designation})`;
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Location</th>
            <th>Designation</th>
            <th>Address</th>
            <th>Username</th>
            <th>Document File</th>
            <th>Manager Name</th>
            <th>Manager's Manager Name</th>
            <th>GM's Manager Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const firstManager = employee.manager;
            const secondManager = firstManager ? firstManager.manager : null;
            const thirdManager = secondManager ? secondManager.manager : null;

            return (
              <tr key={employee.id}>
                <td>{employee.fullName}</td>
                <td>{employee.dob}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.location}</td>
                <td>{employee.designation}</td>
                <td>{employee.address}</td>
                <td>{employee.username}</td>
                <td>
                  <a href={employee.documentFile} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </td>
                <td>{getManagerName(firstManager)}</td>
                <td>{getManagerName(secondManager)}</td>
                <td>{getManagerName(thirdManager)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Employee List</h1>
      {error ? <p>{error}</p> : renderTable()}
    </div>
  );
};

export default EmployeeTable;
