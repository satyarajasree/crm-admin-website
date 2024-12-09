import React, { useState } from "react";
import "../pages/LandSelection.css";
import PlotLayout from "./PlotLayout";
import Agreement from "./Agreement";
import TermsandConditions from "./TermsandConditions";
import Swal from "sweetalert2";

const landOptions = {
  acres: { min: 500000, thirtyPercent: 1350000, full: 4500000 },
  "5-guntas": { min: 200000, thirtyPercent: 450000, full: 1500000 },
  "10-guntas": { min: 400000, thirtyPercent: 900000, full: 3000000 },
  "150-sq-yards": { min: 100000, thirtyPercent: 180000, full: 600000 },
  "200-sq-yards": { min: 100000, thirtyPercent: 240000, full: 800000 },
};

const LandSelection = () => {
  const [selectedLand, setSelectedLand] = useState("");
  const [amountDetails, setAmountDetails] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [isAgreementSigned, setIsAgreementSigned] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleLandSelection = (land) => {
    setSelectedLand(land);
    setAmountDetails(landOptions[land]);
    setSelectedPaymentOption("");
    setPaymentCompleted(false);
    setInvoice(null);
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setTotalAmount(amountDetails[option] + 1000);
  };

  const handlePayment = () => {
    if (!selectedPaymentOption) {
      // alert("Please select a payment option.");
      Swal.fire({
        icon: "warning",
        text: "Please select a payment option.",
        confirmButtonText: "OK",
      });
      return;
    }

    const totalAmount = amountDetails[selectedPaymentOption] + 1000; // Adding Rs. 1000 for application charges
    const passbookNumber = Math.floor(100000 + Math.random() * 900000); // Generate random passbook number

    setInvoice({
      selectedLand,
      selectedPaymentOption,
      amount: totalAmount,
      passbookNumber,
    });
    setPaymentCompleted(true);
  };

  const handleAgreementSigned = () => {
    setIsAgreementSigned(true);
  };

  return (
    <div>
      <div className="terms_con_container">
        <div className="terms">
          <TermsandConditions onAgreementSigned={handleAgreementSigned} />
        </div>

        {/* {isAgreementSigned && ( */}

        <div className="land">
          <div className="land_details">
            <div className="">
              <label className="lands_label">Lands Available</label>
              <select
                onChange={(e) => handleLandSelection(e.target.value)}
                className="select"
              >
                <option value="">Select</option>
                <option value="acres">Acres</option>
                <option value="5-guntas">5 Guntas</option>
                <option value="10-guntas">10 Guntas</option>
                <option value="150-sq-yards">150 Square Yards</option>
                <option value="200-sq-yards">200 Square Yards</option>
              </select>
              {/* </div> */}
            </div>

            {amountDetails && (
              <div className="amount_details">
                <div className="content">
                  <h4>Payment Options</h4>
                </div>
                <div className="details">
                  <div className="amount_selection">
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="min"
                        checked={selectedPaymentOption === "min"}
                        onChange={() => handlePaymentOptionChange("min")}
                      />
                      Minimum Amount ₹{amountDetails.min}
                    </label>
                  </div>
                  <div className="amount_selection">
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="thirtyPercent"
                        checked={selectedPaymentOption === "thirtyPercent"}
                        onChange={() =>
                          handlePaymentOptionChange("thirtyPercent")
                        }
                      />
                      30% Amount ₹{amountDetails.thirtyPercent}
                    </label>
                  </div>
                  <div className="amount_selection">
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="full"
                        checked={selectedPaymentOption === "full"}
                        onChange={() => handlePaymentOptionChange("full")}
                      />
                      Full Amount ₹{amountDetails.full}
                    </label>
                  </div>
                  <p>NOTE: Rs.1000 will be charged as Application Fee</p>
                  <button
                    onClick={handlePayment}
                    disabled={amountDetails[selectedPaymentOption] > 501000}
                    className="pay_now_btn"
                  >
                    Pay Now Rs {totalAmount}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {paymentCompleted && (
          <div className="plot_container">
            <PlotLayout />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandSelection;

{
  /* 
      {paymentCompleted && invoice && (
        <div>
          <h4>Invoice</h4>
          <p>Land Type: {invoice.selectedLand}</p>
          <p>Payment Option: {invoice.selectedPaymentOption}</p>
          <p>Total Amount Paid: ₹{invoice.amount}</p>
          <p>Passbook Number: {invoice.passbookNumber}</p>
          <p>Status: Payment Successful!</p>
        </div>
      )} */
}
