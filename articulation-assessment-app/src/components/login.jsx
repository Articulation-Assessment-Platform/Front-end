import React, { useState } from 'react';
import "./css/LoginHover.Module.css";
import { Link} from 'react-router-dom'
import { LoginApi  } from '../api';
import { useNavigate } from 'react-router-dom';

function LoginComponent({ setLoggingIn }) {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = () => {
      return password.trim() !== '' && email.trim() !== '';
  };

  const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
  };

  const handleLogin = async () => {
      try {
          if (!isFormValid()) {
              document.getElementById('errorLogin').innerText = 'Please fill out all fields.';
              return;
          }
          if(!validateEmail(email)){
              document.getElementById('errorLogin').innerText = 'Please enter a valid email.';
              return;
          }
          const loginCredentials = {
              email: email,
              password: password
          };

          const loginResponse = await LoginApi(loginCredentials);

          if (loginResponse.success) {
              document.cookie = `token=${loginResponse.token}; path=/`; 
              setLoggingIn(false);
              location.reload();
              navigate("/");
          } else {
              document.getElementById('errorLogin').innerText = loginResponse.error;
          }
      } catch (error) {
          console.error('Error occurred:', error);
      }
  }

  return (
    <>
      <div className='background-login'>
        <div className='loginHover'>
      <span className='closeButton' onClick={() => setLoggingIn(false)}>×</span>
          <h2>Login</h2>
          <div>
            <input 
            className='inputLoginHover'
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            className='inputLoginHover'
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id='errorLogin'className='error'></p>
            <button className='buttonLoginHover' onClick={handleLogin}>Login</button>
          </div>

          <p>If you are not registered, please sign up.</p>
          <Link to='/register'><button onClick={() => setLoggingIn(false)} className='buttonLoginHover'>Sign up</button></Link>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
