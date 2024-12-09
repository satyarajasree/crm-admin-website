import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Toaster, toast } from 'react-hot-toast'


import '../../src/App.css'


import { button } from 'framer-motion/client'

import OTPVerification from '../Components/OTPVerification'

import SignInForm from '../Components/Signin'

import SignUpForm from '../Components/Signup'



function UserLogin() {

  const [isSignIn, setIsSignIn] = useState(true)

  const [showOTP, setShowOTP] = useState(false)

  const [email, setEmail] = useState('')


  const handleOTPSend = (userEmail) => {

    setEmail(userEmail)

    setShowOTP(true)

    toast.success('OTP sent successfully!')

  }


  const handleVerifyOTP = (otp) => {

    // Simulate OTP verification

    if (otp === '123456') {

      toast.success('OTP verified successfully!')

      setShowOTP(false)

    } else {

      toast.error('Invalid OTP')

    }

  }


  return (

    <div className="container">

      {/* <Toaster position="top-center" /> */}

      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full">

       

        <div className='row '>

          <div className='col'>

          <motion.div

            className="w-full md:w-1/2 p-8"

            initial={{ x: isSignIn ? 0 : '100%' }}

            animate={{ x: 0 }}

            transition={{ duration: 0.5 }}

          >

            <AnimatePresence mode="wait">

              {showOTP ? (

                <OTPVerification

                  key="otp"

                  email={email}

                  onVerify={handleVerifyOTP}

                  onBack={() => setShowOTP(false)}

                />

              ) : isSignIn ? (

                <SignInForm

                  key="signin"

                  onOTPRequest={handleOTPSend}

                />

              ) : (

                <SignUpForm

                  key="signup"

                />

              )}

            </AnimatePresence>

          </motion.div>

          </div>

          <div className='col-md-6 mt-5 mb-5' style={{background:"#72BF78", borderTopRightRadius:"20px",borderBottomRightRadius:"20px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",display:'flex', justifyContent:'center'}} >

          <div className="side-content hidden md:block w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white mt-5" style={{}}>

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              transition={{ duration: 0.5 }}

              className="text-center"

            >

              <h2 className="text-4xl font-bold mb-4">

                {isSignIn ? 'Welcome Back!' : 'Join Us!'}

              </h2>

              <p className="mb-8">

                {isSignIn

                  ? "Don't have an account yet? Join us now!"

                  : 'Already have an account? Sign in here!'}

              </p>

              <button

                onClick={() => setIsSignIn(!isSignIn)}

                style={{ backgroundColor:"#C0EBA6",padding:"15px" ,Border:"2px solid white" ,

                  borderRadius: "50px 20px"}}

              >

                {isSignIn ? 'Sign Up' : 'Sign In'}

               

              </button>

            </motion.div>

          </div>

          </div>

       

        </div>

      </div>

    </div>

  )

}


export default UserLogin;
