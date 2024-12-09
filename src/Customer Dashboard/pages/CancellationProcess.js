import React, { useState } from 'react';
import "../pages/CancellationProcess.css";
import Swal from 'sweetalert2';
import Base from '../components/Base';



const CancellationProcess = () => {
 
  const [propertyName, setPropertyName] = useState('');
  const [plotPurchased, setPlotPurchased] = useState('');
  const [costOfProperty, setCostOfProperty] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [totalEMIPaid, setTotalEMIPaid] = useState('');
  const [totalAmountPaid, setTotalAmountPaid] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [reEnterAccountNumber, setReEnterAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
 
 
  const calculateRefund = () => {
    const totalPaid = parseFloat(totalAmountPaid);
    if (!isNaN(totalPaid)) {
      return totalPaid - (totalPaid * 0.30);
    }
    return 0;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    Swal.fire({
        title: " Deatils are received !",
        text: " refund will be processed soon!",
        icon: "success"
      });
  };
 
  return (
    <Base>
    <div className="cancelform-container">
      <h2>Cancellation Process</h2>
      <form onSubmit={handleSubmit} className="cancellation-form">
        <div className="section">
          <h3>Property Information</h3>
          <div className="input-group">
            <label>Property Name:</label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Plot Purchased:</label>
            <input
              type="text"
              value={plotPurchased}
              onChange={(e) => setPlotPurchased(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Cost of Property:</label>
            <input
              type="text"
              value={costOfProperty}
              onChange={(e) => setCostOfProperty(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Advance Amount Paid:</label>
            <input
              type="text"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Total EMI's Paid:</label>
            <input
              type="text"
              value={totalEMIPaid}
              onChange={(e) => setTotalEMIPaid(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Total Amount Paid:</label>
            <input
              type="text"
              value={totalAmountPaid}
              onChange={(e) => setTotalAmountPaid(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Amount Returnable (after 30% reduction):</label>
            <input
              type="text"
              value={calculateRefund()}
              readOnly
            />
          </div>
        </div>
 
        <div className="section">
          <h3>Bank Account Details</h3>
          <div className="input-group">
            <label>Account Holder Name:</label>
            <input
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Account Number:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Re-enter Account Number:</label>
            <input
              type="text"
              value={reEnterAccountNumber}
              onChange={(e) => setReEnterAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>IFSC Code:</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Branch Name:</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
        </div>
 
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
 
      {/* {isSubmitted && (
        <div className="popup">
          <p>Details have been noted and Refund will be processed soon.</p>
        </div>
      )} */}
    </div>
    </Base>

 
  )
}
 
export default CancellationProcess;