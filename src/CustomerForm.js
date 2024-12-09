import React, { useState } from 'react';
import axios from 'axios';

const RegisterCustomer = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        if (profileImage) {
            form.append("profileImage", profileImage);
        }

        try {
            const response = await axios.post('http://localhost:8080/v1/customer/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponse(response.data);
        } catch (error) {
            setResponse(error.response ? error.response.data : "An error occurred");
        }
    };

    return (
        <div>
            <h2>Register Customer</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required />
                <input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} required />
                <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                <input type="text" name="groupName" placeholder="Group Name" value={formData.groupName} onChange={handleChange} required />
                <input type="text" name="panNumber" placeholder="Pan Number" value={formData.panNumber} onChange={handleChange} required />
                <input type="text" name="primaryAddress" placeholder="Primary Address" value={formData.primaryAddress} onChange={handleChange} required />
                <input type="text" name="nomineeName" placeholder="Nominee Name" value={formData.nomineeName} onChange={handleChange} required />
                <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required />
                <input type="number" name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} required />
                <input type="file" name="profileImage" onChange={handleFileChange} />
                
                <button type="submit">Register</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default RegisterCustomer;
