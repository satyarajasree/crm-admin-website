import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import pic from "../Images/pic.jpg";
import pic1 from "../Images/pic1.jpg";

const About = () => {
  return (
    <div id="about">
      <Container className="ideology px-3 p-2">
        <hr className="hrLine" />
        <h2 className="text-center fw-bold">
          IDEOLOGY AT <span className="ventureTitle">RAJASREE TOWNSHIPS</span>
        </h2>
        <i>
          <p className="ideology-text text-center">
            Rajasree Townships' ideology is fulfilling every individual’s dream
            of owning a home, farm land or beautiful resort, all while embracing
            a peaceful life in harmony with nature. Our vision goes beyond
            providing just housing, it’s about creating integrated living spaces
            where people can experience a well-rounded, fulfilling lifestyle
            that blends comfort, nature, and community.
          </p>
        </i>
        <hr className="hrLine" />
      </Container>
      <Container>
        <Row className="management d-flex align-items-center justify-content-center">
          {/* Image First on Desktop, Second on Mobile */}
          <Col
            md={6}
            className="management-pic d-flex align-items-center justify-content-center"
          >
            <Image src={pic} className="about-img img-fluid" alt="Director" />
          </Col>
          <Col
            md={6}
            className="management-text order-md-2 order-1 text-center d-flex flex-column align-items-center justify-content-center"
          >
            <h2>
              <span className="text-danger fw-bold">THE DIRECTOR NAME</span>
            </h2>
            <span className="text-success fw-bold d-block mb-3">
              Director of Rajasree
            </span>
            <p className="intro pt-3 ">
              We have successfully completed 9 years of glorious services by
              climbing steps day by day, month after month introducing new
              projects near by the upcoming and blooming Hyderabad and
              Vijayawada. Your investments in our projects are bound to give
              profits up to 200%. We are committed to understanding the unique
              needs and tailoring our services to exceed the expectations of the
              investors.
            </p>
          </Col>
        </Row>

        <Row className="management d-flex align-items-center justify-content-center">
          {/* Image Second on Desktop, First on Mobile */}
          <Col
            md={6}
            className="management-pic order-md-2 order-1 d-flex align-items-center justify-content-center"
          >
            <Image
              src={pic1}
              className="about-img img-fluid"
              alt="Co-Director"
            />
          </Col>
          <Col
            md={6}
            className="management-text order-md-1 order-2 text-center d-flex flex-column align-items-center justify-content-center p-4"
          >
            <h2>
              <span className="text-danger fw-bold">THE CO-DIRECTOR NAME</span>
            </h2>
            <span className="text-success fw-bold d-block mb-3">
              Co-Director of Rajasree
            </span>
            <p className="intro pt-3">
              We have successfully completed 9 years of glorious services by
              climbing steps day by day, month after month introducing new
              projects near by the upcoming and blooming Hyderabad and
              Vijayawada. Your investments in our projects are bound to give
              profits up to 200%. We are committed to understanding the unique
              needs and tailoring our services to exceed the expectations of the
              investors.
            </p>
          </Col>
        </Row>

        <Row className="management d-flex align-items-center justify-content-center">
          {/* Image Second on Desktop, First on Mobile */}
          <Col
            md={6}
            className="management-pic order-md-2 order-1 d-flex align-items-center justify-content-center"
          >
            <Image
              src={pic1}
              className="about-img img-fluid"
              alt="Co-Director"
            />
          </Col>
          <Col
            md={6}
            className="management-text order-md-1 order-2 text-center d-flex flex-column align-items-center justify-content-center p-4"
          >
            <h2>
              <span className="text-danger fw-bold">THE CO-DIRECTOR NAME</span>
            </h2>
            <span className="text-success fw-bold d-block mb-3">
              Co-Director of Rajasree
            </span>
            <p className="intro pt-3">
              We have successfully completed 9 years of glorious services by
              climbing steps day by day, month after month introducing new
              projects near by the upcoming and blooming Hyderabad and
              Vijayawada. Your investments in our projects are bound to give
              profits up to 200%. We are committed to understanding the unique
              needs and tailoring our services to exceed the expectations of the
              investors.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
