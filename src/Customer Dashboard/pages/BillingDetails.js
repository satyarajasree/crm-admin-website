import React, { useState } from "react";
import "../pages/BillingDetails.css";
import image from "../images/Qr code.png";
import { Table } from "react-bootstrap";
import Base from "../components/Base";
import { Button, Modal, Form } from "react-bootstrap";

const BillingDetails = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const emiDetails = [
    {
      Sno: "1",
      month: "January 2024",
      status: "Paid",
      receipt: "invoice-jan.pdf",
    },
    {
      Sno: "2",
      month: "February 2024",
      status: "Paid",
      receipt: "invoice-feb.pdf",
    },

    { Sno: "3", month: "March 2024", status: "Pending", receipt: null },
  ];

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handlePaymentFailure = () => {
    setPaymentFailed(true);
  };

  const Bills = [
    {
      Sno: "1",
      month: "February 2024",
      emiAmount: "₹20,000",
      status: "Unpaid",
      invoiceNumber: null,
    },
    {
      Sno: "2",
      month: "March 2024",
      emiAmount: "₹20,000",
      status: "Unpaid",
      invoiceNumber: null,
    },
    {
      Sno: "3",
      month: "April 2024",
      emiAmount: "₹20,000",
      status: "Unpaid",
      invoiceNumber: null,
    },
  ];
  const handleDownloadInvoice = (fileName) => {
    const link = document.createElement("a");
    link.href = `/path/to/invoices/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadReceipt = (emi) => {
    setSelectedEMI(emi);
    setShowUploadModal(true);
  };

  const handleUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmitReceipt = () => {
    setShowUploadModal(false);
    alert(
      `Transaction receipt for ${selectedEMI?.month} received. Invoice will be generated within 1 day`
    );
  };
  return (
    <Base>
      <div className="billing-main">
        <div className="billing_container">
          <div className="b_table">
            <div className="row">
              <h3 className="text-success">Billing Details</h3>

              {/* <div className="col"></div> */}
              <div className="col billing_col">
                <Table className="billing-table">
                  <thead>
                    <tr>
                      <th id="table-head">Plot</th>
                      <th id="table-head">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Property Name</td>
                      <td>Green City</td>
                    </tr>
                    <tr>
                      <td>Plot Purchased</td>
                      <td>Plot #23</td>
                    </tr>
                    <tr>
                      <td>Cost of the Property</td>
                      <td>₹2,000,000</td>
                    </tr>
                    <tr>
                      <td>Advance Amount Paid</td>
                      <td>₹500,000</td>
                    </tr>
                    <tr>
                      <td>EMI Amount</td>
                      <td>₹20,000 / Month</td>
                    </tr>
                    <tr>
                      <td>Emi Amount</td>
                      <td> ₹2000 / Daily </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {/* <div className="col"></div> */}
            </div>
          </div>

          <div className="emi_details_container">
            <div className="row">
              <h3 className="text-success">EMI Details</h3>
            </div>
            <div className="row emi_table_row">
              <div className="col"></div>
              <div className="col emi_table_col">
                <div className="table-wrapper">
                  {/* <center> */}
                  <Table bordered hover className="equal-size-table">
                    <thead>
                      <tr>
                        <th id="table-head">sno</th>
                        <th id="table-head">Month</th>
                        <th id="table-head">Status</th>
                        <th id="table-head">Invoice</th>
                        <th id="table-head">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiDetails.map((emi, index) => (
                        <tr key={index}>
                          <td>{emi.Sno}</td>
                          <td>{emi.month}</td>
                          <td>{emi.status}</td>
                          <td>
                            {emi.status === "Paid" && (
                              <button
                                className="view-btn"
                                onClick={() => handleViewInvoice(emi)}
                              >
                                👁️ View
                              </button>
                            )}
                          </td>
                          <td>
                            {emi.status === "Pending" ? (
                              <button className="pay-btn">Pay</button>
                            ) : (
                              <button
                                className="download-btn"
                                onClick={() =>
                                  handleDownloadInvoice(emi.receipt)
                                }
                              >
                                📥 Download
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* </center> */}
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>

        {isModalOpen && selectedInvoice && (
          <div className="modal">
            <div className="modal-content">
              <thead>
                <tr>
                  <th> sno</th>
                  <th> PropertyName</th>
                  <th> Date </th>
                  <th> Invoice Number</th>
                </tr>
              </thead>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <div className="invoice">
                <h3>Invoice</h3>

                {/* <p>
                <strong>Month:</strong> {selectedInvoice.month}
              </p>
              <p>
                <strong>Status:</strong> {selectedInvoice.status}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹20,000
              </p>
              <p>
                <strong>Receipt:</strong>{" "}
                {selectedInvoice.receipt || "Not Available"}
              </p> */}

                {
                  <thead>
                    <tr>
                      <th> sno</th>
                      <th> PropertyName</th>
                      <th> Date </th>
                      <th> Invoice Number</th>
                    </tr>
                  </thead>
                }

                <button
                  className="download-btn"
                  onClick={() => handleDownloadInvoice(selectedInvoice.receipt)}
                >
                  📥 Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <center> */}
        <div className="payment_failed_container">
          <p className="Payment_note">
            Note: When payment Gateway failed below details will be visible.
          </p>

          <h4 className="payment_note_sub"> QR code / Bank Account Details </h4>

          <h2 className="text-success"> Bank Account Details</h2>
          <div className="row payment_details_table_row">
            {/* <div className="col"></div> */}
            <div className="col">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th id="table-head"> Sno</th>
                    <th id="table-head"> Account Number </th>
                    <th id="table-head"> IFSC Code </th>
                    <th id="table-head"> Account Name </th>
                    <th id="table-head"> Branch Name </th>
                  </tr>
                </thead>
                <tbody bordered hover>
                  <tr>
                    <td> 1 </td>
                    <td> 147852369 </td>
                    <td> HDF00001 </td>
                    <td> Rajasree Townships </td>
                    <td> Vijayawada </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col"></div>
          </div>

          <h2 className="text-success"> Scan Here </h2>
          <img
            src={image}
            alt="Images"
            // style={{ width: "25%", height: "20%" }}
            className="b_scanner"
          />
          <p className="text-success"> Use any one option from above method.</p>
        </div>

        <div className="billing_table_container">
          <div className="row  billing_table_row">
            <div className="col"></div>
            <div className="col">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th id="table-head"> Sno </th>
                    <th id="table-head">Month</th>
                    <th id="table-head">EMI Amount</th>
                    <th id="table-head">Status</th>
                    <th id="table-head">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Bills.map((bill, index) => (
                    <tr key={index}>
                      <td>{bill.Sno}</td>
                      <td>{bill.month}</td>
                      <td>{bill.emiAmount}</td>
                      <td>{bill.status}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleUploadReceipt(bill)}
                        >
                          Payment Done
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col"></div>

            {/* </center> */}
          </div>
          <Modal
            show={showUploadModal}
            onHide={() => setShowUploadModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                please capture and upload the screenshot or receipt payment done
                by you.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Upload Screenshot / Receipt</Form.Label>
                <Form.Control type="file" onChange={handleUpload} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitReceipt}
                disabled={!uploadedFile}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Base>
  );
};

export default BillingDetails;
