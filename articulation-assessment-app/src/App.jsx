import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'
import "./App.css";
import { HomePage, ParentPage, SpeechTherapistPage, ForumPage } from "./pages";

function App() {
  return (
  <>
  <div className='navbar'>
    <div className='background'>
    </div>    
    <nav>
        <ul>
          <li className='logo'><Link to="/home"></Link></li>
          <li><Link to="/home">Homepage</Link></li>
          <li><Link to="/speech-therapist">Speech Therapist</Link></li>
          <li><Link to="/parents">Parents</Link></li>
          <li><Link to="/forum">Forum</Link></li>
          <li className='login'><a href="#">Log in</a></li>
        </ul>
      </nav>  
  </div>
  <Routes>
    <Route path='/home' element={<HomePage />} /> 
    <Route path='/speech-therapist' element={<SpeechTherapistPage />} />
    <Route path='/parents' element={<ParentPage />} />
    <Route path='/forum' element={<ForumPage />} />
  </Routes>
  <div class="footer">
    <br/>
    <div>
      <p>Contact us at: maike.meek.11@gmail.com</p>
    </div>
    <hr className='line'></hr>
    <p>© 2024 Articulation Assessment Platform</p>
    <br/>
  </div>
  </>
  );
}

export default App;