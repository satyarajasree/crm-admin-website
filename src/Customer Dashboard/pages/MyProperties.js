import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "../pages/MyProperties.css";
import Base from "../components/Base";

const Myproperties = () => {
  const properties = [
    {
      id: 1,
      propertyName: "Green city",
      area: "1200 sq.ft",
      location: "Hyderabad",
      plotNumber: "23A",
      facing: "North-East",
      passbookNumber: "PB12345678",
      price: "₹50,00,000",
      bookingDate: "2024-10-01",
      agreementDoc: "",
      termsDoc: "/path-to-terms.pdf",
    },
    {
      id: 2,
      propertyName: "Future Green City",
      area: "1500 sq.ft",
      location: "hyderabad",
      plotNumber: "45B",
      facing: "East",
      passbookNumber: "PB87654321",
      price: "₹75,00,000",
      bookingDate: "2024-11-15",
      agreementDoc: "/path-to-agreement.pdf",
      termsDoc: "/path-to-terms.pdf",
    },
  ];

  const downloadDocument = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = true;
    link.click();
  };

  return (
    <Base>
  <div className="my_properties_main_container">

      <div className="row">
        <h2 className="my_pr_heading">My properties</h2>
      </div>
      <div className="row My_properties_container">
        {/* <div className="col-3"></div> */}
        <div className="col ">
          <Container className="my_properties mt-4  ">
            <div className="my_pr_table">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th className="table_heading">Property Name</th>
                    <th className="table_heading">Area</th>
                    <th className="table_heading">Location</th>
                    <th className="table_heading">Plot Number</th>
                    <th className="table_heading">Facing</th>
                    <th className="table_heading">Passbook Number</th>
                    <th className="table_heading">Price</th>
                    <th className="table_heading">Date of Booking</th>
                    <th className="table_heading">Agreement Document</th>
                    <th className="table_heading">Terms & Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.propertyName}</td>
                      <td>{property.area}</td>
                      <td>{property.location}</td>
                      <td>{property.plotNumber}</td>
                      <td>{property.facing}</td>
                      <td>{property.passbookNumber}</td>
                      <td>{property.price}</td>
                      <td>{property.bookingDate}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() =>
                            downloadDocument(property.agreementDoc)
                          }
                        >
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => downloadDocument(property.termsDoc)}
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
        {/* <div className="col-3"></div> */}
      </div>
  </div>

    </Base>
  );
};

export default Myproperties;
