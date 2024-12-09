import React from "react";
import "../pages/AvailableProperties.css";
import { Navigate, useNavigate } from "react-router-dom";
import Base from "../components/Base";
import Text from "./Text";
// import Footer from "./Footer";
import { FaHandPointUp } from "react-icons/fa";

const properties = [
  {
    id: 1,
    name: "Future Green City",
    location: "Hyderabad",
    image: "https://agarwalestates.com/images/blogs/property-management.jpg",
    route: "/property/hyderabad",
  },
  {
    id: 2,
    name: "Sai Kesava",
    location: "Vijayawada",
    image:
      "https://st.depositphotos.com/1064045/4612/i/450/depositphotos_46127851-stock-photo-fantastic-island.jpg",
    route: "/property/vijayawada",
  },
];

const AvailableProperties = () => {
  const navigate = useNavigate();

  const handlePropertyClick = (property) => {
    navigate(property.route);
  };

  return (
    <Base>
      <div className="available_pro_cont">
        <div className="gallery">
          <img
            src="https://www.trimurty.com/blog/wp-content/uploads/2016/08/property-investement.jpg"
            width="100%"
          ></img>
        </div>

        <div className="property_container row">
          <div className="col">
            <Text />
          </div>
          <p className="Available_property_text mt-2 col">
            Future Green City Project We have successfully completed 9 years of
            glorious services by climbing steps day by day, month after month
            introducing new projects near the upcoming and blooming Hyderabad
            and Vijayawada. Your investments in our projects are bound to give
            profits up to 200%. We are committed to understanding the unique
            needs and tailoring our services to exceed the expectations of the
            investors. Features Amenities Very Near to the proposed Regional
            Ring Road (RRR) Hyderabad. Lowest price offered by this firm under
            Cyberabad commission rate jurisdiction. 40 Minutes from Rajiv Gandhi
            International Airport. Very near to Shivannaguda Reservoir. Under 10
            km to textiles Industrial parks and Automobile Industrial Park. 4
            kms to Rachakonda Fort Environmental Friendly and Natural Beauty
            Weather Condition.
          </p>
        </div>

        <div className="properties-container ">
          {/* <h1>Current Projects</h1> */}
          {properties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => handlePropertyClick(property)}
            >
              <div className="property-image-container">
                <img
                  src={property.image}
                  alt={property.name}
                  className="property-image"
                />
              </div>
              <div className="overley_text">
                <h3>{property.name}</h3>
                <p>{property.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="avilable_note">
          <h1>Click On the Each Project Above To Know More Details </h1>
          <span>
            <FaHandPointUp />
          </span>
        </div>

        {/* <div>
          <Footer />
        </div> */}
      </div>
    </Base>
  );
};

export default AvailableProperties;
