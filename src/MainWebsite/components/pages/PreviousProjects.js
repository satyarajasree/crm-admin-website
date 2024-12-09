import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../pages/project.css";
import Image1 from "../Images/image_5.jpg";
import Image2 from "../Images/image_6.jpg";

const PerviousProjects = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const buildings = [
    {
      id: 1,
      imgSrc: Image1,
      title: " Past project 1 - city",
      description:
        "Future Green City Project We have successfully completed 9 years of glorious services by climbing steps day by day, month after month introducing new projects near the upcoming and blooming Hyderabad and Vijayawada. Your investments in our projects are bound to give profits up to 200%. We are committed to understanding the unique needs and tailoring our services to exceed the expectations of the investors. Features Amenities Very Near to the proposed Regional Ring Road (RRR) Hyderabad. Lowest price offered by this firm under Cyberabad commission rate jurisdiction. 40 Minutes from Rajiv Gandhi International Airport. Very near to Shivannaguda Reservoir. Under 10 km to textiles Industrial parks and Automobile Industrial Park. 4 kms to Rachakonda Fort Environmental Friendly and Natural Beauty Weather Condition.",
    },
    {
      id: 2,
      imgSrc: Image2,
      title: "Past project 2 - city",
      description:
        "Future Green City Project We have successfully completed 9 years of glorious services by climbing steps day by day, month after month introducing new projects near the upcoming and blooming Hyderabad and Vijayawada. Your investments in our projects are bound to give profits up to 200%. We are committed to understanding the unique needs and tailoring our services to exceed the expectations of the investors. Features Amenities Very Near to the proposed Regional Ring Road (RRR) Hyderabad. Lowest price offered by this firm under Cyberabad commission rate jurisdiction. 40 Minutes from Rajiv Gandhi International Airport. Very near to Shivannaguda Reservoir. Under 10 km to textiles Industrial parks and Automobile Industrial Park. 4 kms to Rachakonda Fort Environmental Friendly and Natural Beauty Weather Condition.",
    },
  ];

  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <Container className="projects">
      <Row>
      <hr className="hrLine" />
        <h2 className="text-center fw-bold pt-2 pb-2">
          PREVIOUS PROJECTS OF{" "}
          <span className="ventureTitle">RAJASREE TOWNSHIPS</span>
        </h2>
        <p className="text-desc">
          Rajasree Townships presents premium open plots projects, Future Green
          City in Hyderabad and Sai Kesava in Vijayawada, offering eco-friendly
          living, strategic locations, and modern amenities for both investment
          and residential purposes.
        </p>
        {buildings.map((building) => (
          <Col xs={12} sm={6} md={6} key={building.id} className="mb-4">
            <div className="image-container">
              <img
                src={building.imgSrc}
                alt={building.title}
                className="zoom-image"
                onClick={() => openFullscreen(building)}
              />
              <div className="image-text-overlay">{building.title}</div>
            </div>
          </Col>
        ))}
      </Row>

      {fullscreenImage && (
        <div className="fullscreen-overlay">
          <Button className="back-button" onClick={closeFullscreen}>
            X
          </Button>
          <div className="fullscreen-image-container mt-5">
            <img
              src={fullscreenImage.imgSrc}
              alt={fullscreenImage.title}
              className="fullscreen-image"
            />
          </div>
          <div className="fullscreen-content">
            <h3>{fullscreenImage.title}</h3>
            <p>{fullscreenImage.description}</p>
            <Button
              variant="success"
              onClick={() => {
                const link = document.createElement("a");
                link.href = fullscreenImage.imgSrc;
                link.download = `${fullscreenImage.title}.jpg`;
                link.click();
              }}
            >
              Download Broucher
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PerviousProjects;
