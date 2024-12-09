import React from 'react'
import Header from './components/pages/Header'
import Slider from './components/includes/Slider'
import Project from './components/pages/Project'
import About from './components/pages/About'
import CustomerReview from './components/pages/CustomerReview'
import Contact from './components/pages/Contact'
import Footer from './components/pages/Footer'
import PreviousProjects from './components/pages/PreviousProjects';
import Chatbot from './components/includes/Chatbots'

const Home = () => {
  return (
    <div>
        <main className='main'>
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
    </div>
  )
}

export default Home