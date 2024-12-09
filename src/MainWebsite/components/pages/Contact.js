import Location from "../pages/Location.js";
import "./contact.css";
import { Col, Row } from "react-bootstrap";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import Location1 from "./Location1.js";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_c0m3u08', 'template_8rdlcks', form.current, {
        publicKey: 'HHo9TZPj6z09cllwc',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div id="contact" className="contact_page container mt-5">
      <Row className="g-3 gy-3">
      <Col>
        <div className="part_3  shadow-md">
            <Location1 />
          </div>
        </Col>
        <Col className="col_part_1">
          <div className="part_1  shadow-md">
            <div className="px-6 py-10">
              <div className="text-center">
                <h4 className="text-balance text-4xl font-semibold tracking-tigh text-gray-900">
                  Contact Us
                </h4>
              </div>
              <form
                className="mt-7" ref={form} onSubmit={sendEmail}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone number"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="phone number"
                        name="phone_number"
                        type="number"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-lime-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-lime-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>

        <Col >
          <div className="part_2  shadow-md">
            <Location />
          </div>
        </Col>
        
      </Row>
    </div>
  );
}
export default Contact;
