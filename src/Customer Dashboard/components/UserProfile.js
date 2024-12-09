import React, { useEffect, useRef, useState } from "react";
import "./UserProfile.css";
import CountryCodePicker from "./countrypicker";
import UserProfileModal from "./UserProfileModal";

const UserProfile = () => {
  //default value untill fetch data from API
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    dob: "1990-01-01",
    primaryAddress: "123 Main St, Cityville",
    secondaryAddress: "456 Secondary St, Townsville",
    profilePhoto: "https://via.placeholder.com/150",
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    mobile: true,
    dob: false,
    primaryAddress: false,
    secondaryAddress: false,
    nominee: true,
    profilePhoto: true,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [nominee, setNewNominee] = useState("");
  const [isPendingApproval, setIsPendingApproval] = useState(false);

  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };
  const handleNomineeChange = (e) => {
    setNewNominee(e.target.value);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevUser) => ({
          ...prevUser,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = "/login";
  };

  // const submitNomineeChange = () => {
  //   if (
  //     profile.newNominee === profile.nominee ||
  //     profile.newNominee.trim() === ""
  //   ) {
  //     setMessage("No changes detected or nominee field is empty.");
  //     return;
  //   }

  //   setMessage(
  //     "Nominee change request sent for approval. Admin will review it."
  //   );
  //   setIsPendingApproval(true);
  // };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <div className="user-profile-dropdown " ref={dropdownRef}>
      <div
        className="profile-header"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={profile.profilePhoto}
          alt="Profile"
          className="profile-photo"
        />

        <span>{profile.name}</span>
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <input type="file" onChange={handleProfilePhotoChange} />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="dropdown-item">
            <label>Email ID:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <label className="mobile_number">Mobile Number:</label>

          <div className="dropdown-item phone_row">
            <CountryCodePicker />

            <input
              type="text"
              name="mobile"
              maxLength={10}
              value={profile.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="dropdown-item">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="dropdown-item">
            <label>Primary Address:</label>
            <textarea
              name="primaryAddress"
              value={profile.primaryAddress}
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>
          <div className="dropdown-item">
            <label>Secondary Address:</label>
            <textarea
              name="secondaryAddress"
              value={profile.secondaryAddress}
              onChange={handleInputChange}
              disabled
            ></textarea>
          </div>
          <div className="dropdown-item">
            <div>
              <label>Current Nominee:</label>
              <input type="text" value={nominee} disabled />
            </div>
            <div>
              <label>New Nominee:</label>
              <input
                type="text"
                placeholder="Enter new nominee"
                value={profile.newNominee}
                onChange={handleNomineeChange}
              />
            </div>
            {/* <button
              onClick={submitNomineeChange}
              disabled={isPendingApproval}
              className="btn f-s"
            >
              Submit for Nominee Approval
            </button> */}
            {message && <p>{message}</p>}
          </div>

          <UserProfileModal />

          {message && <p className="message">{message}</p>}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
