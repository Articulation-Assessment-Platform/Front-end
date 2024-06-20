import React from 'react';

const PostObject = ({ activeCategory, posts }) => {


  return (
    <div className="forum-posts">

    </div>
  );
};

const isImage = (url) => {
  return /\.(jpg|jpeg|png|gif)$/i.test(url);
};

export default PostObject;
