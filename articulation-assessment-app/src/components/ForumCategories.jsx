import React from 'react';

const ForumCategories = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Open posts', 'My posts', 'Speech therapist posts'];

  return (
    <div className="forum-categories">
      {categories.map(category => (
        <button
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default ForumCategories;
