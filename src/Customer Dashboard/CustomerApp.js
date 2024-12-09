import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AvailableProperties from "./pages/AvailableProperties";
import HyderabadProperties from "./pages/HyderabadProperties";
// import VijayawadaProperty from "./pages/VijayawadaProperty";
import BillingDetails from "./pages/BillingDetails";
import InvoiceDetails from "./pages/InvoiceDetails";
import MyProperties from "./pages/MyProperties";
import CancellationProcess from "./pages/CancellationProcess";
// import SignUpForm from "./pages/SignUpForm";
// import UserLogin from "./pages/UserLogin";
// import OTPVerification from "./pages/OtpVerification";

function CustomerApp() {
  return (
    <>
     
        <Routes> 
          {/* <Route path="/Register" element={<SignUpForm />}></Route>
          <Route path="user_login" element={<UserLogin />}></Route>
          <Route path="/otp_verification" element={<OTPVerification />}></Route> */}


          <Route path="/customer/dashboard" element={<Dashboard />}></Route>
          <Route
            path="Available_properties"
            element={<AvailableProperties />}
          ></Route>
          <Route
            path="/property/hyderabad"
            element={<HyderabadProperties />}
          ></Route>
          <Route path="/billing_details" element={<BillingDetails />}></Route>
          <Route path="/invoice_details" element={<InvoiceDetails />}></Route>
          <Route path="/my_properties" element={<MyProperties />}></Route>
          <Route path="/cancellation_process" element={<CancellationProcess />}></Route>
        </Routes>
    </>
  );
}

export default CustomerApp;
