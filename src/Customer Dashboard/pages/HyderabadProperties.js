import React from "react";
import Base from "../components/Base";
import LandSelection from "./LandSelection";
import "../pages/HyderabadProperties.css";

const HyderabadProperties = () => {
  return (
    <Base>
      <div className="available_pro_cont">
        <div className="gallery">
          <img
            src="https://agarwalestates.com/images/blogs/property-management.jpg"
            width="100%"
          ></img>
        </div>

        <div className="hyd_pro_con  future ">
          <div className="column-text col-3">
            <h1 className="future-text">Future</h1>
            <h1 className="future-text">
              <span className="green-text">Green City</span>
            </h1>
          </div>

          <div className="hyd_property_text mt-2 col-9">
            Future Green City Project We have successfully completed 9 years of
            glorious services by climbing steps day by day, month after month
            introducing new projects near the upcoming and blooming Hyderabad
            and Vijayawada. Your investments in our projects are bound to give
            profits up to 200%. We are committed to understanding the unique
            needs and tailoring our services to exceed the expectations of the
            investors. Features Amenities Very Near to the proposed Regional
            Ring Road (RRR) Hyderabad.
          </div>
        </div>

        <div className="Amenities_property_text">
          <h2> Amenities </h2>
          <ul>
            <li className="amenities_column">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6owXxdoX0GC4e3e5dMkaY-hyeVOw1bhOyQ&s"></img>
              Very Near to the proposed Regional Ring Road (RRR)Hyderabad.The
              Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
            
            </li>
            <li className="amenities_column">
              Lowest price offered by this firm under cyberaba commission rate
              jurisdiction. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjtezQJQnVjVMacObU8fuogM048UwX8-XYJg&s"></img>
            </li>
            <li className="amenities_column">
              <img src="https://www.hyderabad.aero/packages/images/photo-gallery/photo-1.jpg"></img>
              40 Minutes from Rajiv Gandhi International Airport. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
            </li>
            <li className="amenities_column">
              Very near to Shivannaguda Reservoir. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRcyQpRbmJe4uFCdBeeIs0jEfv9NUxFsfayg&s"></img>
            </li>
            <li className="amenities_column">
              <img src="https://www.niir.org/blog/wp-content/uploads/2021/09/Sustainable-Industrial-Park-1.jpg"></img>
              Under 10 km to textiles Industrial parks and Automobile Industrial
              Park. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
            </li>
            <li className="amenities_column">
              4 kms to Rachakonda Fort. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknhB2CPSw-g1EkYS1thVCtVfMg0qCtsVniA&s"></img>
            </li>
            <li className="amenities_column">
              <img src="https://www.shutterstock.com/image-photo/breathtaking-countryside-green-meadows-river-260nw-2441613721.jpg"></img>
              Environmental Friendly and Natural Beauty Weather Condition. Regional Ring Road (RRR) in Hyderabad, India is expected to have
              many benefits for the city and its surrounding areas, including:
            </li>
          </ul>
        </div>
        <div className="pro_container">
          <div>
            <LandSelection />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default HyderabadProperties;
