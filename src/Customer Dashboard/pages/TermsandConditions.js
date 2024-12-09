import React, { useRef, useState } from "react";
import "../pages/TermsandCondition.css";
import SignatureCanvas from "react-signature-canvas";
import Swal from "sweetalert2";

const TermsandConditions = ({ onAgreementSigned }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const sigCanvas = useRef(null);

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setSignatureData("");
  };

  const handleSaveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.toDataURL();
      setSignatureData(dataURL);
      setIsAgreed(true);
      Swal.fire({
        icon: "success",
        title: "Signature Saved",
        text: "Your signature has been successfully saved!",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Signature Missing",
        text: "Please provide your signature before proceeding.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleProceed = () => {
    if (!isChecked) {
      Swal.fire({
        icon: "warning",
        title: "Terms Not Accepted",
        text: "You need to accept the terms and conditions to proceed.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isAgreed) {
      Swal.fire({
        icon: "warning",
        title: "Signature Missing",
        text: "Please provide your signature before proceeding.",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Agreement Accepted",
      text: "You have accepted the terms and signed the agreement!",
      confirmButtonText: "OK",
    }).then(() => {
      onAgreementSigned(); // Proceed to next action (e.g., navigation)
    });
  };

  return (
    <div className="terms_and_Condition container">
      <div className="terms_and_con_property_text row">
        <h4 className="top_heading">Terms And Conditions</h4>
        <ul className="terms_con_list">
          <p className="terms_heading">Acceptance of Terms</p>
          <li>
            By accessing and using the Rajasree Townships app, I agree to be
            bound by the Terms and Conditions or If you don’t agree please
            refrain from using the website/app.
          </li>
          <li>
            The area of the plot in Guntas is approximately 605 Sq.yards (5
            Guntas), 1210 Sq.yards. (10 Guntas). Per Gunta without EMI, it Costs
            Rs 3,00,000/- & With EMI per Gunta it Costs Rs 3,50,000/-.
          </li>
          <li>
            Farm Land per Acre Costs Rs 45,00,000/-. For booking Rs.5,00,000/-
            per acre should be paid.
          </li>
          <li>For each agreement 30% of the property value is to be paid.</li>
          <li className="check_list">
            <input
              type="checkbox"
              id="acceptTerms"
              className="terms_check"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I declare my consent to the above terms and conditions, and I am
            satisfied that I have inspected the land in the above survey
            numbers.
          </li>
        </ul>

        <div className="conditions_signature">
          <p>Signature of Member Signature of Guardian in case of Minor</p>

          <p>Provide Digital Signature</p>
          <center>
            <div className="signature_cont">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 300,
                  height: 50,
                  className: "sigCanvas",
                }}
              />
            </div>
          </center>
        </div>

        <div className="singature_btns row">
          <button onClick={handleClearSignature} className="clear">
            Clear
          </button>
          <button onClick={handleSaveSignature} className="save">
            Save
          </button>
        </div>

        {isAgreed && (
          <div className="confirm_sig_cont">
            {/* <h4 className="terms_text">Agreement Status</h4> */}
            <p className="terms_text">
              You have successfully signed the agreement.
            </p>
            <img
              src={signatureData}
              alt="Customer Signature"
              className="confirm_signature"
            />
            <button onClick={handleProceed} className="proceed_btn">
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsandConditions;
