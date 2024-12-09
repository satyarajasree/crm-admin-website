import { useState, useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Swal from "sweetalert2";

const countryCode = [
  { code: "+1", name: "USA" },

  { code: "+44", name: "UK" },

  { code: "+91", name: "IND" },

  { code: "+49", name: "Germany" },

  { code: "+971", name: "UAE" },

  // Add more country codes as needed
];

const employeeDatabase = [
  { employeeId: "EMP001", name: "John Doe", designation: "Software Engineer" },

  { employeeId: "EMP002", name: "Jane Smith", designation: "Project Manager" },

  {
    employeeId: "EMP003",

    name: "Alice Johnson",

    designation: "UI/UX Designer",
  },

  { employeeId: "EMP004", name: "Bob Brown", designation: "QA Analyst" },

  // Add more employees as needed
];

function SignUpForm() {
  const [formData, setFormData] = useState({
    customerName: "",

    fatherName: "",

    dateOfBirth: "",

    age: "",

    aadharNumber: "",

    mobileNumber: "",

    countryCode: "+91", // Default country code

    email: "",

    city: "",

    pincode: "",

    groupName: "",

    panNumber: "",

    primaryAddress: "",

    nomineeName: "",

    occupation: "",

    employeeId: "",

    name: "",

    designation: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [response, setResponse] = useState("");

  const [errors, setErrors] = useState({});

  const [inputValue, setInputValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateMobileNumber = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const nonRequiredFields = [
        "city",

        "occupation",

        "employeeId",

        "name",

        "designation",
      ];

      if (!formData[field] && !nonRequiredFields.includes(field)) {
        newErrors[field] = "This field is required";
      }
    });

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format";
    }

    if (formData.employeeId) {
      const employee = employeeDatabase.find(
        (emp) => emp.employeeId === formData.employeeId
      );

      if (!employee) {
        newErrors.employeeId = "Employee ID not found";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (profileImage) {
        form.append("profileImage", profileImage);
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/v1/customer/register",

          form,

          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setResponse(response.data);

        Swal.fire("Success", "Form submitted successfully!", "success");

        setFormData({
          customerName: "",

          fatherName: "",

          dateOfBirth: "",

          age: "",

          aadharNumber: "",

          mobileNumber: "",

          countryCode: "+91",

          email: "",

          city: "",

          pincode: "",

          groupName: "",

          panNumber: "",

          primaryAddress: "",

          nomineeName: "",

          occupation: "",

          employeeId: "",

          name: "",

          designation: "",
        });

        setProfileImage(null);
      } catch (error) {
        Swal.fire(
          "Error",

          error.response ? error.response.data : "An error occurred",

          "error"
        );
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "dateOfBirth") {
      const age = calculateAge(value);

      setFormData((prevData) => ({
        ...prevData,

        dateOfBirth: value,

        age: age.toString(),
      }));
    } else if (name === "employeeId") {
      setFormData((prevData) => ({
        ...prevData,

        employeeId: value,

        name: "",

        designation: "",
      }));

      setInputValue(value);

      if (value) {
        const filteredSuggestions = employeeDatabase

          .filter((emp) =>
            emp.employeeId.toLowerCase().startsWith(value.toLowerCase())
          )

          .map((emp) => emp.employeeId);

        setSuggestions(filteredSuggestions);

        setShowSuggestions(true);
      } else {
        setSuggestions([]);

        setShowSuggestions(false);
      }
    } else if (name === "profileImage") {
      setProfileImage(files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedEmployee = employeeDatabase.find(
      (emp) => emp.employeeId === suggestion
    );

    if (selectedEmployee) {
      setFormData((prevData) => ({
        ...prevData,

        employeeId: selectedEmployee.employeeId,

        name: selectedEmployee.name,

        designation: selectedEmployee.designation,
      }));

      setInputValue(selectedEmployee.employeeId);

      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="container mt-5">
        <div className="row">
          {" "}
          <div className="col">
            <div className="text-center mb-4">
              <h2 className="text-center fw-bold">Create Account</h2>

              <p className=" text-center text-muted">
                Welcome to Rajasree Townships!
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="container  flex-nowrap justify-content-center"
            >
              {/* Full Name */}

              <div className="mb-3 row">
                <label className="form-label mb-0">Full Name*</label>

                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.customerName ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.customerName ? "orange" : "",
                  }}
                  required
                />

                {errors.customerName && (
                  <div className="invalid-feedback">{errors.customerName}</div>
                )}
              </div>

              {/* Father/Spouse Name */}

              <div className="mb-3 row">
                <label className="form-label mb-0">Father/Spouse Name*</label>

                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.fatherName ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.fatherName ? "orange" : "",
                  }}
                  required
                />

                {errors.fatherName && (
                  <div className="invalid-feedback">{errors.fatherName}</div>
                )}
              </div>

              {/* Date of Birth */}

              <div className="mb-3">
                <label className="form-label mb-0">Date of Birth*</label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.dateOfBirth ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.dateOfBirth ? "orange" : "",
                  }}
                  required
                />

                {errors.dateOfBirth && (
                  <div className="invalid-feedback">{errors.dateOfBirth}</div>
                )}
              </div>

              {/* Age (Auto-populated) */}

              <div className="mb-3">
                <label className="form-label mb-0">Age</label>

                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="form-control"
                  style={{ width: "80%", backgroundColor: "#e9ecef" }}
                />
              </div>

              {/* Email */}

              <div className="mb-3">
                <label className="form-label mb-0">Email*</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  style={{
                    width: "80%",

                    borderColor: errors.email ? "orange" : "",
                  }}
                  required
                />

                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Mobile Number */}

              <div className="mb-3">
                <label className="form-label mb-0">Mobile Number*</label>

                <div className="row">
                  <div className="col-sm-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="form-control"
                      style={{ width: "80%" }}
                      required
                    >
                      <option value="">Select Code</option>

                      {countryCode.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-8">
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.mobileNumber ? "is-invalid" : ""
                      }`}
                      style={{
                        width: "80%",

                        borderColor: errors.mobileNumber ? "orange" : "",
                      }}
                      required
                    />

                    {errors.mobileNumber && (
                      <div className="invalid-feedback">
                        {errors.mobileNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Primary Address */}

              <div className="mb-3">
                <label className="form-label mb-0">Primary Address*</label>

                <input
                  type="text"
                  name="primaryAddress"
                  value={formData.primaryAddress}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.primaryAddress ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.primaryAddress ? "orange" : "",
                  }}
                  required
                />

                {errors.primaryAddress && (
                  <div className="invalid-feedback">
                    {errors.primaryAddress}
                  </div>
                )}
              </div>

              {/* City */}

              <div className="mb-3">
                <label className="form-label mb-0">City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  style={{ width: "80%" }}
                />
              </div>

              {/* Pincode */}

              <div className="mb-3">
                <label className="form-label mb-0">Pincode*</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.pincode ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.pincode ? "orange" : "",
                  }}
                  required
                />

                {errors.pincode && (
                  <div className="invalid-feedback">{errors.pincode}</div>
                )}
              </div>

              {/* Aadhar Number */}

              <div className="mb-3">
                <label className="form-label mb-0">Aadhar Number*</label>

                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.aadharNumber ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.aadharNumber ? "orange" : "",
                  }}
                  required
                />

                {errors.aadharNumber && (
                  <div className="invalid-feedback">{errors.aadharNumber}</div>
                )}
              </div>

              {/* Pan Number */}

              <div className="mb-3">
                <label className="form-label mb-0">Pan Number</label>

                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.panNumber ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.panNumber ? "orange" : "",
                  }}
                />

                {errors.panNumber && (
                  <div className="invalid-feedback">{errors.panNumber}</div>
                )}
              </div>

              {/* Group Name */}

              <div className="mb-3">
                <label className="form-label mb-0">Group Name*</label>

                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.groupName ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.groupName ? "orange" : "",
                  }}
                  required
                />

                {errors.groupName && (
                  <div className="invalid-feedback">{errors.groupName}</div>
                )}
              </div>

              {/* Occupation */}

              <div className="mb-3">
                <label className="form-label mb-0">Occupation</label>

                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="form-control"
                  style={{ width: "80%" }}
                />
              </div>

              {/* Profile Image */}

              <div className="mb-3">
                <label className="form-label mb-0">Upload Photo*</label>

                <input
                  type="file"
                  name="profileImage"
                  onChange={handleChange}
                  className={`form-control ${
                    errors.profileImage ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.profileImage ? "orange" : "",
                  }}
                  required
                />

                {errors.profileImage && (
                  <div className="invalid-feedback">{errors.profileImage}</div>
                )}
              </div>

              {/* Nominee Name */}

              <div className="mb-3">
                <label className="form-label mb-0">Nominee Name*</label>

                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.nomineeName ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.nomineeName ? "orange" : "",
                  }}
                  required
                />

                {errors.nomineeName && (
                  <div className="invalid-feedback">{errors.nomineeName}</div>
                )}
              </div>

              {/* Employee Ref ID with Suggestion Box */}

              <div className="mb-3" ref={suggestionsRef}>
                <label className="form-label mb-0">Employee Ref ID</label>

                <input
                  type="text"
                  name="employeeId"
                  value={inputValue}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.employeeId ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.nomineeName ? "orange" : "",
                  }}
                  required
                />

                {errors.nomineeName && (
                  <div className="invalid-feedback">{errors.nomineeName}</div>
                )}
              </div>

              {/* Employee Ref ID with Suggestion Box */}

              <div className="mb-3" ref={suggestionsRef}>
                <label className="form-label mb-0">Employee Ref ID</label>

                <input
                  type="text"
                  name="employeeId"
                  value={inputValue}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.employeeId ? "is-invalid" : ""
                  }`}
                  style={{
                    width: "80%",

                    borderColor: errors.employeeId ? "orange" : "",
                  }}
                  autoComplete="off"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    className="list-group position-absolute"
                    style={{ width: "80%", zIndex: "1000" }}
                  >
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ cursor: "pointer" }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}

                {errors.employeeId && (
                  <div className="invalid-feedback">{errors.employeeId}</div>
                )}
              </div>

              {/* Name (Auto-populated and Disabled) */}

              <div className="mb-3">
                <label className="form-label mb-0">Employee Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="form-control"
                  style={{
                    width: "80%",

                    backgroundColor: "#e9ecef",

                    borderColor: formData.name ? "" : "",
                  }}
                />
              </div>

              {/* Designation (Auto-populated and Disabled) */}

              <div className="mb-3">
                <label className="">Employee Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  readOnly
                  className="form-control"
                  style={{
                    width: "80%",

                    backgroundColor: "#e9ecef",

                    borderColor: formData.designation ? "" : "",
                  }}
                />
              </div>

              {/* Submit Button */}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    width: "100px",

                    backgroundColor: "#55883B",

                    padding: "10px",

                    border: "none",

                    borderRadius: "25px",

                    color: "white",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Display Response Message */}

        {response && <div className="mt-4 alert alert-info">{response}</div>}
      </div>
    </div>
  );
}

export default SignUpForm;
