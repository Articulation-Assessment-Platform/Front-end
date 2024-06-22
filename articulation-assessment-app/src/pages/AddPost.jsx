import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddPostApi } from '../api/Forum';

import './css/AddPostPage.Module.css';

const AddPostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));

    if (!tokenCookie) {
      navigate('/home');
    }
  }, [navigate]);

  const [isPosted, setIsPosted] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('all'); // Default audience choice
  const [file, setFile] = useState(null); // State for file upload
  const [fileType, setFileType] = useState('image'); // Default file type (image or audio)
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Determine file type based on extension (for simplicity here, assuming either image or audio)
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      if (extension === 'mp3' || extension === 'wav') {
        setFileType('audio');
      } else {
        setFileType('image');
      }
    }
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

  const handleAddPost = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        setError('Please fill in both Title and Content fields.');
        return;
      }

      let forumId = '2'; // Default forumId

      if (audience === 'speechTherapist') {
        forumId = '1';
      }
      const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));
  

        const token = tokenCookie.split('=')[1]; 
        const user  = parseJwt(token);
        const authorId = user.nameid;

      const postCredentials = {
        title, 
        content,
        authorId,
        audience,
        forumId, 
        file
    };

      const response = await AddPostApi(postCredentials);

      if (response.success) {
        setIsPosted(true);
      } else {
        // Handle error response
        console.error('Error adding post:', response.error);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='add-post'>
      <h1>Add New Post</h1>
      {!isPosted ? (
        <>
          <div className='add-post-container'>
            <div className='add-post-box'>
              <div className='input-group'>
                <label htmlFor='title'>Title</label>
                <input
                  id='title'
                  className='add-post-input'
                  type='text'
                  placeholder='Title'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError('');
                  }}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='content'>Content</label>
                <textarea
                  id='content'
                  className='add-post-input'
                  placeholder='Content'
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setError('');
                  }}
                  rows='4'
                ></textarea>
              </div>
              <div className='input-group'>
                <label htmlFor='audience'>Audience</label>
                <select
                  id='audience'
                  className='add-post-input'
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value='all'>All</option>
                  <option value='speechTherapist'>Speech Therapist</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className='input-group'>
                <label htmlFor='file'>Upload {fileType === 'image' ? 'Image' : 'Audio'}</label>
                <input
                  id='file'
                  className='add-post-input'
                  type='file'
                  accept={`${fileType === 'image' ? 'image/*' : 'audio/*'}`}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          {error && <p className='error'>{error}</p>}
          <button className='add-post-button' onClick={handleAddPost}>
            Add Post
          </button>
        </>
      ) : (
        <p>Post added successfully!</p>
      )}
    </div>
  );
};

export default AddPostPage;
