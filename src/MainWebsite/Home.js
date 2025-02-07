import React, { useState, useEffect } from 'react';
import Header from './components/pages/Header';
import Slider from './components/includes/Slider';
import Project from './components/pages/Project';
import About from './components/pages/About';
import CustomerReview from './components/pages/CustomerReview';
import Contact from './components/pages/Contact';
import Footer from './components/pages/Footer';
import PreviousProjects from './components/pages/PreviousProjects';
import Chatbot from './components/includes/Chatbots';
import Preloader from './components/Preloader';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
      setTransition(true); // Trigger the transition
    }, 3000); // Adjust delay as needed
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader /> // Show preloader while loading
      ) : (
        <main className={`main ${transition ? 'fade-in-active' : 'fade-in'}`}>
          <Header />
          <Slider />
          <Project />
          <PreviousProjects />
          <About />      
          <CustomerReview />
          <Contact />
          <Chatbot />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Home;
