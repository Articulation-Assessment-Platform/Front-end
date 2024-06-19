import React, { useState, useEffect } from 'react';
import './css/Profile.Module.css';
import { useNavigate } from 'react-router-dom';
import { GetUserApi } from '../api';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));
    
      if (!tokenCookie) {
        navigate('/unauthorized');
        return;
      }

      try {
        const response = await GetUserApi();
        const userData = await response.json();  
        setEmail(userData.data.email);
        setFirstName(userData.data.firstName);
        setLastName(userData.data.lastName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className='center'>
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-info">
          <div className="profile-item">
            <span className="profile-label">First Name:</span>
            <span className="profile-data"> {firstName}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Last Name:</span>
            <span className="profile-data"> {lastName}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-data"> {email}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn edit-btn">Edit</button>
          <button className="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
