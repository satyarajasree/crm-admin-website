import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
 
export default function Test() {
 
  const [formData, setFormData] = useState({
        customerName: '',
        fatherName: '',
        dateOfBirth: '',
        age: '',
        aadharNumber: '',
        mobileNumber: '',
        email: '',
        city: '',
        pincode: '',
        groupName: '',
        panNumber: '',
        primaryAddress: '',
        nomineeName: '',
        occupation: '',
        employeeId: '',
  });
 
  const [profileImage, setProfileImage] = useState(null);
    const [response, setResponse] = useState('');
                     
  const [errors, setErrors] = useState({});
 
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
   
    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission logic
      console.log("Form submitted successfully", formData);
    } else {
      setErrors(newErrors);
    }
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
    });                
    if (profileImage) {
        form.append("profileImage", profileImage);
    }
    try {
      const response = await axios.post('http://localhost:8080/customer/register', form, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      setResponse(response.data);
      toast.success('Customer registered successfully!');
  } catch (error) {
      setResponse(error.response ? error.response.data : "An error occurred");
      toast.error(error.response ? error.response.data : 'Registration failed. Please try again.');
  }
 
  };
 
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when re-typing
  };
 
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Create Account</h2>
        <p className="text-muted">Welcome to Rajasree Townships!</p>
      </div>
 
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
            
          <label className="form-label">Customer Full Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Father/Spouse Name */}
        <div className="mb-3">
          <label className="">Father/ Spouse Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%", border:"1px solid gray" }}
            required
          />
        </div>
 
        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Age */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            style={{ width: "80%" }}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
                                   
        {/* Mobile Number */}
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
 
            style={{ width: "80%" }}
            required
          />
          {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
        </div>
 
        {/* Primary Address */}
        <div className="mb-3">
          <label className="form-label">Primary Address</label>
          <input
            type="text"
            name="primaryAddress"
            value={formData.primaryAddress}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* City */}
        <div className="mb-3">
          <label className="form-label">City</label>
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
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
           
          />
        </div>
 
        {/* Aadhar Number */}
        <div className="mb-3">
          <label className="form-label">Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aaadharNumber}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Pan Number */}
        <div className="mb-3">
          <label className="form-label">Pan Number</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Group Name */}
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Occupation */}
        <div className="mb-3">
          <label className="form-label">Occupation</label>
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
          <label className="form-label">Upload Photo</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Nominee Name */}
        <div className="mb-3">
          <label className="form-label">NomineeName</label>
          <input
            type="text"
            name="nomineeName"
            value={formData.nomineeName}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
            required
          />
        </div>
 
        {/* Employee Ref Id */}
        <div className="mb-3">
          <label className="form-label">Employee Ref Id</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="form-control"
            style={{ width: "80%" }}
           
           
          />
        </div>
 
        {/* Submit Button */}
        <div style={{display: "flex", justifyContent: "center"}}>
        <button
 
          type="submit"
          style={{
            width: "100px",
            backgroundColor: "#55883B",
            padding: "15px",
            border: "5px  white",
            borderRadius: "25px",
           
          }}
        >
          Sign Up
         
        </button>
        </div>
      </form>
    </div>
  );
}