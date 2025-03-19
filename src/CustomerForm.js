import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT token from localStorage
        const response = await axios.get(
          "http://localhost:8080/main/admin/get-all-customer-properties",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJNQUlOLUFETUlOIiwiaWF0IjoxNzM5NTEyNjg3LCJleHAiOjE3NDA3MjIyODd9.FE15RVb5XWqxrGJgxn1wdkv-oFcTZ-6t_QLu3hmTdBk`,
            },
          }
        );
        setProperties(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Customer Properties</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Father Name</th>
            <th>City</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Occupation</th>
            <th>Group Name</th>
            <th>Plot Number</th>
            <th>Plot Direction</th>
            <th>Plot Amount</th>
            <th>Passbook</th>
            <th>Purchase Date</th>
            <th>Amount Paid</th>
            <th>EMI Paid</th>
            <th>Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.customer?.customerName}</td>
              <td>{property.customer?.fatherName}</td>
              <td>{property.customer?.city}</td>
              <td>{property.customer?.email}</td>
              <td>{property.customer?.mobileNumber}</td>
              <td>{property.customer?.occupation}</td>
              <td>{property.customer?.groupName}</td>
              <td>{property.plots?.plotNumber}</td>
              <td>{property.plots?.plotDirection}</td>
              <td>{property.plots?.plotAmount}</td>
              <td>{property.passbook}</td>
              <td>{new Date(property.purchaseDate).toLocaleDateString()}</td>
              <td>{property.emiDetails?.amountPaid}</td>
              <td>{property.emiDetails?.emiPaid}</td>
              <td>{property.emiDetails?.remainingAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerForm;
