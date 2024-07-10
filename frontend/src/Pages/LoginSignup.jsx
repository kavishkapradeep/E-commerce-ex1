import React from 'react'
import '../Pages/css/LoginSignup.css'


const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text"  placeholder='Your Name'/>
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password'/>
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">
            Already have an account? <span>login here</span>
            <div className="loginsignup-agree">
              <input type="checkbox" name="" id="" />
              <p>By continuing , i agree to the term of  use & prvacy policy.</p>
            </div>
          </p>
      </div>
    </div>
  )
}

export default LoginSignup