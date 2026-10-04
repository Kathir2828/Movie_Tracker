import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleAuth } from '../config/firebase.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  


  const handleLogin =  async (e) => {    
    e.preventDefault();
    if(!email || !password){
      setError(true);
      return;
    }
    setError(false);
    try{
      await signInWithEmailAndPassword(auth,email,password);
      console.log("login success");
      navigate('/');
    }
    catch(err){
      console.log("error happening in login")
      console.log(err);
      }
    };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      console.log("Google login success");
      navigate('/');
    } catch (err) {
      console.log("error happening in google login");
      console.log(err);
    }
  };

    return (
    <div className="login-container">
      <div className="login-box">
        <h1>MovieFlix</h1>
        <p>Login to your account</p>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>fill all the fields properly</p>}
        <form onSubmit={handleLogin}>
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
              placeholder="Enter password"
            />
          </div>

          <button
            type='submit'
            className="login-btn"
          >
            Login
          </button>
          <button
            type='button'
            className="login-btn google-btn"
            onClick={handleGoogleAuth}
            style={{ marginTop: '10px', backgroundColor: '#db4437', color: 'white' }}
          >
            Login with Google
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login