import React, { useState, useEffect } from 'react';
import './css/Profile.Module.css';
import { useNavigate } from 'react-router-dom';
import { GetUserApi } from '../api';
import DeleteUserApi from '../api/DeleteUserApi'; // Assuming you have implemented DeleteUserApi

const ProfilePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));

      if (!tokenCookie) {
        navigate('/home');
        return;
      }

      try {
        const response = await GetUserApi();
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    try {
      const response = await DeleteUserApi();
      if (response.success) {
        setDeleteSuccess(true);
        setDeleteSuccess(false);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
        window.location.reload();
      } else {
        console.error('Failed to delete user data:', response.error);
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

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
          <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete all your user data?</p>
          <button className="btn confirm-btn" onClick={confirmDelete}>Confirm</button>
          <button className="btn cancel-btn" onClick={cancelDelete}>Cancel</button>
        </div>
      )}

      {deleteSuccess && (
        <div className="delete-success active">
          <p>User data successfully deleted.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
