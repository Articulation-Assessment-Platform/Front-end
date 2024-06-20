import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, ForumCategories, PostList } from '../components/Index';
import { GetPostsApi, GetSpeechTherapistPostsApi, DeletePostApi, GetMyPostsApi } from '../api/Forum'; // Import DeletePostApi if not already imported
import './css/Forum.Module.css';

const Forum = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Open Forums');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith('token='));

    if (tokenCookie) {
  
        const token = tokenCookie.split('=')[1]; 
       setUser(parseJwt(token));
    }
  }, []);

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


  useEffect(() => {
    const loadPosts = async () => {
      let fetchedPosts;
      if (activeCategory === 'Open Forums') {
        fetchedPosts = await GetPostsApi();
      } else if (activeCategory === 'Speech therapist posts') {
        fetchedPosts = await GetSpeechTherapistPostsApi();
      } else if (activeCategory === 'My posts'){
        fetchedPosts = await GetMyPostsApi(user.nameid);
      }else {
        fetchedPosts = await GetPostsApi(); 
      }

      if (fetchedPosts.success) {
        setPosts(fetchedPosts.data);
        setFilteredPosts(fetchedPosts.data);
      } else {
        console.error('Error fetching posts:', fetchedPosts.error);
      }
    };
    loadPosts();
  }, [activeCategory]);

  const addPost = () => {
    navigate('/addpost');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPosts(posts); 
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await DeletePostApi(postId);
      if (response.success) {
        const updatedPosts = posts.filter(newPosts => newPosts.id !== postId);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        console.log('Post deleted successfully');
      } else {
        console.error('Error deleting post:', response.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      {user && (
        <div className="post-buttons">
          <button onClick={addPost}>Add Post</button>
        </div>
      )}
      {user && <ForumCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
      <SearchBar onSearch={handleSearch} />
      <PostList posts={filteredPosts} onDelete={handleDeletePost} user={user} />
    </>
  );
};

export default Forum;
