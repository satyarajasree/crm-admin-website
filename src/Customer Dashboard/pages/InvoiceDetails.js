import React from "react";
import "../pages/InvoiceDetails.css";
 
import {
  Table,Container,Row,Col,Button,Modal,Form,
} from "react-bootstrap";
import Base from "../components/Base";
 
const InvoiceDetails = () => {
  const invoiceData = [
    {
      id: 1,
      invoiceNumber: "#12345",
      propertyName: "Green City",
      price: 500000,
      paidAmount: 500000,
      date: "2024-11-01",
      filePath: "/path/to/invoice-12345.pdf",
    },
    {
      id: 2,
      invoiceNumber: "#67890",
      propertyName: "Green city",
      price: 700000,
      paidAmount: 200000,
      date: "2024-10-15",
      filePath: "/path/to/invoice-67890.pdf",
    },
  ];
 
  const handleDownload = (filePath, invoiceNumber) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = `Invoice_${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return (
    <Base>
      <h2 className="text-success">Invoice Details</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th id="table-heading">Sno</th>
            <th id="table-heading">Invoice Number</th>
            <th id="table-heading">Property Name</th>
            <th id="table-heading">Cost of the Property (₹)</th>
            <th id="table-heading">Paid Amount (₹)</th>
            <th id="table-heading">Date</th>
            <th id="table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((invoice, index) => (
            <tr key={invoice.id}>
              <td>{index + 1}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.propertyName}</td>
              <td>{invoice.price.toLocaleString()}</td>
              <td>{invoice.paidAmount.toLocaleString()}</td>
              <td>{invoice.date}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => alert(`Viewing invoice: ${invoice.invoiceNumber}`)}
                >
                  View
                </button>
                &nbsp;
                <button
                  className="download-btn"
                  onClick={() => handleDownload(invoice.filePath, invoice.invoiceNumber)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Base>
  );
};
 
export default InvoiceDetails;