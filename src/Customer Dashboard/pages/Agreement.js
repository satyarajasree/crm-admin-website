// import React, { useRef, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import TermsandConditions from "./TermsandConditions";
// import "../pages/Agreement.css";

// const Agreement = ({ onAgreementSigned }) => {
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [signatureData, setSignatureData] = useState("");
//   const sigCanvas = useRef(null);

//   const handleClearSignature = () => {
//     sigCanvas.current.clear();
//     setSignatureData("");
//   };

//   const handleSaveSignature = () => {
//     if (!sigCanvas.current.isEmpty()) {
//       const dataURL = sigCanvas.current.toDataURL();
//       setSignatureData(dataURL);
//       setIsAgreed(true);
//     } else {
//       alert("Please provide your signature before proceeding.");
//     }
//   };

//   return (
//     <div className="conditions">
//       <h1>Terms and Conditions</h1>
//       <div>{<TermsandConditions />}</div>

//       <h4>Provide Your Signature</h4>
//       <div className="signature_cont">
//         <SignatureCanvas
//           ref={sigCanvas}
//           penColor="black"
//           canvasProps={{
//             width: 400,
//             height: 150,
//             className: "sigCanvas",
//           }}
//         />
//       <div className="btns">
//         <button onClick={handleClearSignature}>Clear Signature</button>
//         <button onClick={handleSaveSignature}>Save Signature</button>
//       </div>
//       </div>


//       {isAgreed && (
//         <div>
//           <h4>Agreement Status</h4>
//           <p>You have successfully signed the agreement.</p>
//           <img
//             src={signatureData}
//             alt="Customer Signature"
//             style={{ border: "1px solid ", width: "200px", marginTop: "10px" }}
//           />
//           <button
//             onClick={onAgreementSigned}
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               padding: "10px",
//             }}
//           >
//             Proceed
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Agreement;
