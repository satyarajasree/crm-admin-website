// components/includes/Preloader.js
import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from './styles/preloader.json'; // Replace with the path to your Lottie JSON file
import './styles/Preloader.css'; // You can add any custom styles for the preloader

const Preloader = () => {
  const defaultOptions = {
    loop: true,          // Loop the animation
    autoplay: true,      // Start automatically
    animationData: loadingAnimation, // The JSON animation file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // Ensures the animation scales correctly
    }
  };

  return (
    <div className="preloader">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Preloader;
