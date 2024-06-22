import React from 'react';
import PropTypes from 'prop-types';
import './css/PostList.Module.css';

const PostList = ({ posts, onDelete, user }) => {
  return (
    <div className="forum-posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Author ID:</strong> {post.authorId}</p>
          <p><strong>Date:</strong> {new Date(post.dateTime).toLocaleString()}</p>
          {post.url && post.url !== "None" && (
            <div className="media">
              <img src={post.url} alt="Post media" />
            </div>
          )}
          {user && post.authorId == user.nameid && ( 
            <button onClick={() => onDelete(post.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    nameid: PropTypes.string.isRequired,
  }),
};


export default PostList;
