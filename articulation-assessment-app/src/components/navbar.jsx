// Home.js
import React from 'react';
import "./css/Home.css";
import { CodeLoginComponent, InformationComponent } from "../components/Index";


const Navbar = () => {
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
  </>
 );
}

export default Navbar;
