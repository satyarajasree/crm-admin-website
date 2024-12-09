
import { useState } from 'react';

import { ArrowLeft } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function OTPVerification({ email, onVerify, onBack }) {

  const [otp, setOtp] = useState(['', '', '', '', '', '']);


  const handleChange = (element, index) => {

    if (isNaN(element.value)) return false;


    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);


    // Focus next input

    if (element.nextSibling) {

      element.nextSibling.focus();

    }

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onVerify(otp.join(''));

  };


  return (

    <div className="container mt-5">

      <button

        onClick={onBack}

        className="btn btn-link text-primary d-flex align-items-center mb-3"

      >

        <ArrowLeft className="me-2" />

        Back

      </button>


      <div className="text-center mb-4">

        <h2 className="fw-bold">Verify OTP</h2>

        <p className="text-muted">We've sent a code to {email}</p>

      </div>


      <form onSubmit={handleSubmit} className="text-center">

        <div className="d-flex justify-content-center mb-4">

          {otp.map((data, index) => (

            <input

              key={index}

              type="text"

              maxLength="1"

              value={data}

              onChange={(e) => handleChange(e.target, index)}

              className="form-control form-control-lg text-center mx-1"

              style={{ width: '3rem' }}

            />

          ))}

        </div>


        <button

          type="submit"

          className="btn btn-primary w-100 " style={{display:"flex",justifyContent:"center"}}

        >

          Verify OTP

        </button>

      </form>


      <p className="text-center text-muted mt-3">

        Didn't receive the code?{' '}

        <button className="btn btn-link text-primary p-0">Resend OTP</button>

      </p>

    </div>


    

  );

}

