import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";
import { HomePage, ParentPage, SpeechTherapistPage, ForumPage, RegisterPage, NotFoundPage, ProfilePage } from "./pages";
import { LoginComponent } from "./components/Index";

function App() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));
  
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1]; 
      setUser(parseJwt(token));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Invalid JWT token', e);
        return null;
    }
}

  return (
    <>
      <div className='navbar'>
        <div className='background'></div>
        <nav>
          <ul>
            <li className='logo'><Link to="/home"></Link></li>
            <li><Link to="/">Homepage</Link></li>
            {user && user.role == 'SpeechTherapist' ? (
              <>
              <li><Link to="/articulation tests">Articulation tests</Link></li>
              <li><Link to="/children">Children</Link></li>
              </>
            ) : (
              <>
              <li><Link to="/speech-therapist">Speech Therapist</Link></li>
              <li><Link to="/parents">Parents</Link></li>
              </>
            )}
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/forum">Forum2</Link></li>
            {user ? (
              <>
                <li><Link to='/profile' className='right2'>Profile</Link></li>
                <li><Link to='/' className='right' onClick={handleLogout}>Log out</Link></li>
              </>
            ) : (
              <li className="link"onClick={() => setLoggingIn(true)}>Log in</li>
            )}
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/speech-therapist" element={<SpeechTherapistPage />} />
        <Route path="/parents" element={<ParentPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="*" element={<NotFoundPage />} /> 
        <Route path="/unauthorized" element={<NotFoundPage/>}/>
      </Routes>
      {loggingIn && <LoginComponent setLoggingIn={setLoggingIn} />}
      <div className="footer">
        <br />
        <div>
          <p>Contact us at: maike.meek.11@gmail.com</p>
        </div>
        <hr className='line'></hr>
        <p>© 2024 Articulation Assessment Platform</p>
        <br />
      </div>
    </>
  );
}

export default App;
