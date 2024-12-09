import React, { useRef, useState } from "react";
import "../components/UserProfileModal.css";

const UserProfileModal = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const otpInputRef = useRef(null);

  const handleUpdateDetails = () => {
    setOtpSent(true);
    setMessage(""); 
  };

  const handleSubmitOtp = () => {
    const correctOtp = "1234"; // Example OTP for validation
    if (enteredOtp === correctOtp) {
      setModalType("success");
      setMessage("Profile details updated successfully!");
    } else {
      setModalType("error");
      setMessage("OTP is wrong. Please try again.");
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === "success") {
     
      setOtpSent(false);
      setEnteredOtp("");
    } else if (modalType === "error") {
     
      otpInputRef.current?.focus();
    }
  };

  return (

    
    <div>

      {otpSent ? (
        <div className="otp-section">
          <p className="text">Enter the OTP sent to your registered details:</p>
          <input
            ref={otpInputRef}
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            className="input"
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
          <button className="btn" onClick={handleSubmitOtp}>
            Submit OTP
          </button>
        </div>
      ) : (
        <button className="update_btn" onClick={handleUpdateDetails}>
          Update Details
        </button>
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay " >
          <div className="modal">
            <h3
              style={{
                color: modalType === "success" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {modalType === "success" ? "Success" : "Error"}
            </h3>
            <p style={{
                color: modalType === "success" ? "green" : "red",
                fontWeight: "bold",
              }}>{message}</p>
            <div className="modal-buttons">
              <button
                className="btn btn-success"
                onClick={handleModalClose}
                style={{
                  backgroundColor: modalType === "success" ? "green" : "green",
                }}
              >
                OK
              </button>
              {modalType === "error" && (
                <button className="btn" onClick={handleModalClose}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileModal;
