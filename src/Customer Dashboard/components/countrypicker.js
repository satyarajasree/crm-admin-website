import React, { useState } from "react";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import '../components/countrypicker.css'


const CountryCodePicker = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    value: "+1",
    label: "🇺🇸 +1",
  });

  // List of country codes
  const countryOptions = [
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+61", label: "🇦🇺 +61" },
    { value: "+81", label: "🇯🇵 +81" },
    { value: "+86", label: "🇨🇳 +86" },
  ];

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div className="country_code">

      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        className="country-picker"
        isSearchable
        
      />
   
    </div>
  );
};

export default CountryCodePicker;
