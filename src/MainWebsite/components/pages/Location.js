import React from "react";
import { IoLocation, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import "../pages/Location.css";

const Location = () => {
  return (
    <div className="location_page">
        
      <div className="addres_part p-3 pt-3">
        <div className="location gapping">
          <div className="icon location_icon">
            <IoLocation fontSize={"20px"} />
          </div> 
          <div className="line_gap">
            <p className="">Plot No 130 1st Floor GSK ARCADE</p>
            <p className="">Beside Shilparamam  Bhagath Phase-2 </p>
            <p className="">Uppal Hyderabad-500039</p>
          </div>
        </div>

        <div className="location">
          <div className="icon">
            <MdEmail fontSize={"20px"} />
          </div>
          <div>
            <p>rajasreetowships@gmail.com</p>
          </div>
        </div>

        <div className="location">
          <div className="icon">
            <IoCall fontSize={"20PX"} />
          </div>
          <div>
            <p>(+91) 6262 666 999</p>
          </div>
        </div>
      </div>
      <div class="mapswrapper">
        <iframe
          width="100%"
          title="Hyderabad"
          height="325"
          loading="lazy"
          allowfullscreen
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Plot%20No.%20130%201st%20floor%20gsk%20arcade%20beside%20shilparamam%20bhagayath%20phase-&zoom=10&maptype=roadmap"
        ></iframe>
      </div>
    </div>
  );
};
export default Location;