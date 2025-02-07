import Location from "../pages/Location.js";
import "./contact.css";
import { Col, Row } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Location1 from "./Location1.js";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_c0m3u08", "template_8rdlcks", form.current, {
        publicKey: "HHo9TZPj6z09cllwc",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div id="contact" className="contact_page container mt-5">
      <Row className="g-3 gy-3">
        <Col>
          <div className="part_3 shadow-md">
            <Location1 />
          </div>
        </Col>
        <Col className="col_part_1">
          <div className="part_1 shadow-md">
            <div className="px-4 py-4">
              <div className="text-center">
                <h4 className="fw-semibold text-uppercase text-dark">
                  Contact Us
                </h4>
              </div>
              <form className="mt-4" ref={form} onSubmit={sendEmail}>
                <Row className="mb-3">
                  <Col sm={6}>
                    <label htmlFor="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      className="form-control"
                    />
                  </Col>
                  <Col sm={6}>
                    <label htmlFor="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone-number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    name="phone_number"
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="form-control"
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="btn btn-success w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col>
          <div className="part_2 shadow-md">
            <Location />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
