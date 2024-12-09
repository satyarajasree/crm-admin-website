import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CustomerReview = () => {
  return (
    <Container>
      <Row>
        <h2 className="customer text-center pt-5 text-orange-600 fw-bold">
          OUR HAPPY CUSTOMERS
        </h2>
        <p className="text-center fw-bold">
          Our customers are at the heart of everything we do! Explore their
          heartfelt experiences and success stories, showcasing the trust and
          satisfaction they’ve found with Rajasree Townships. Their reviews
          inspire us to continue delivering premium open plots projects that
          exceed expectations.
        </p>
        <Col md={4} className="pt-2">
          <iframe
            width="100%"
            height="300px"
            src="https://www.youtube.com/embed/7EHnQ0VM4KY?si=d56HHS8VwRn1COf2"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Col>

        <Col md={4} className="pt-2">
          <iframe
            width="100%"
            height="300px"
            src="https://www.youtube.com/embed/7EHnQ0VM4KY?si=d56HHS8VwRn1COf2"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Col>

        <Col md={4} className="pt-2">
          <iframe
            width="100%"
            height="300px"
            src="https://www.youtube.com/embed/7EHnQ0VM4KY?si=d56HHS8VwRn1COf2"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerReview;
