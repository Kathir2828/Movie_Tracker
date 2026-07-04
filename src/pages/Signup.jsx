import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuth } from '../config/firebase.js';
import './Signup.css';


function Signup(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!password  || !confirmPassword  || !email ||  password !== confirmPassword){
      setError(true);
      return;
    }
    setError('');
    try{
      await createUserWithEmailAndPassword(auth,email,password);
      console.log('Account created successfully!');
      navigate('/');
    }
    catch(err){
      setError(err.message);
      console.log(err);
    }
  }

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      console.log('Google signup successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Join MovieFlix</h1>
        <p>Create your account to get started</p>
        {error && <p style={{color: 'red', textAlign: 'center'}}>fill all the fields properly!</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              id="confirmPassword"
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <button
            type='submit'
            className="login-btn"
          >
            Sign Up
          </button>
          <button
            type='button'
            className="login-btn google-btn"
            onClick={handleGoogleAuth}
            style={{ marginTop: '10px', backgroundColor: '#db4437', color: 'white' }}
          >
            Sign up with Google
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}


export default Signup
    